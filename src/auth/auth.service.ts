import * as bcrypt from "bcrypt";
import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CustomException } from "../common/exceptions/custom-exception.exception";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "../modules/user/user.service";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly useService: UserService,
        private readonly mailer: MailerService
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.users.findUnique({
            where: { email }
        });

        if (!user) throw new CustomException(false, "Usuário ou senha incorretos!", HttpStatus.FORBIDDEN);

        const confirmPassword = await bcrypt.compare(password, user.password);

        if (!confirmPassword) throw new CustomException(false, "Usuário ou senha incorretos!", HttpStatus.FORBIDDEN);

        const { password: pass, ...result } = user;

        return result;
    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: "login",
                audience: "users"
            });

            return data;
        } catch (error) {
            throw new CustomException(false, error, HttpStatus.BAD_REQUEST);
        }
    }

    async register(data: AuthRegisterDTO) {
        const { success, user } = await this.useService.register(data);

        if (success) {
            return this.login(user);
        }
    }

    async forget(email: string) {
        const user = await this.prisma.users.findUnique({
            where: {
                email
            }
        });

        if (!user) throw new CustomException(false, "Email está incorreto!", HttpStatus.UNAUTHORIZED);

        const token = this.jwtService.sign({
            id: user.id,
        }, {
            expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: "forget",
            audience: "users"
        });

        const mailer = await this.mailer.sendMail({
            subject: "Recuperação de Senha",
            to: email,
            template: "forget",
            context: {
                name: user.name,
                token
            }
        });

        if (!mailer) throw new CustomException(false, "Erro ao enviar o email!", HttpStatus.UNAUTHORIZED);

        return { success: true, message: "Token enviado com sucesso!" };
    }

    async reset(password: string, token: string) {
        const data: any = this.jwtService.verify(token, {
            issuer: "forget",
            audience: "users"
        });

        if (isNaN(Number(data.id))) throw new CustomException(false, "Token não é valido", HttpStatus.BAD_REQUEST);

        const salt = await bcrypt.genSalt();
        const pass = await bcrypt.hash(password, salt);

        const user = await this.prisma.users.update({
            where: {
                id: data.id
            },
            data: {
                password: pass,
            }
        });

        if (!user) throw new CustomException(false, "Email está incorreto!", HttpStatus.UNAUTHORIZED);

        return this.login(user);
    }
}