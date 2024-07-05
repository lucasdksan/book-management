import * as bcrypt from "bcrypt";
import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CustomException } from "../common/exceptions/custom-exception.exception";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "../modules/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly useService: UserService
    ){}

    async validateUser(email: string, password: string){
        const user = await this.prisma.users.findUnique({
            where: { email }
        });

        if(!user) throw new CustomException(false, "Usuário ou senha incorretos!", HttpStatus.FORBIDDEN);

        const confirmPassword = await bcrypt.compare(password, user.password);

        if(!confirmPassword) throw new CustomException(false, "Usuário ou senha incorretos!", HttpStatus.FORBIDDEN);

        const { password: pass, ...result } = user;

        return result;
    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    checkToken(token: string){
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

        if(success) {
            return this.login(user);
        }
    }
}