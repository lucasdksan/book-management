import * as bcrypt from "bcrypt";
import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CustomException } from "../common/exceptions/custom-exception.exception";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
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
}