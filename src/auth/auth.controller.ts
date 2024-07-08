import { Body, Controller, Get, HttpException, HttpStatus, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../common/guards/local-auth.guard";
import { User } from "../common/decorators/user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt.guard";
import { CustomException } from "../common/exceptions/custom-exception.exception";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthUpdateDTO } from "./dto/auth-update.dto";
import { AuthChangePasswordDTO } from "./dto/auth-change-password.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthLoginDTO } from "./dto/auth-login.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiOperation({ summary: "Fazer o Login." })
    @ApiBody({ type: AuthLoginDTO, description: "Dados que serão alterados." })
    @ApiResponse({ status: 200, description: "Retorna o token de acesso caso o login seja correto." })
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req){
        try {
            const result = this.authService.login(req.user);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Pegar os dados dados do usuário." })
    @ApiResponse({ status: 200, description: "Vai pegar o token de acesso e retornar os dados contidos no token de acesso." })
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async profile(@User() user){
        try {
            return { user };
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Alterar os dados do usuário." })
    @ApiResponse({ status: 200, description: "Retorna positivo caso tenha alterado os dados com sucesso." })
    @ApiBody({ type: AuthUpdateDTO, description: "Dados que serão alterados." })
    @UseGuards(JwtAuthGuard)
    @Patch("edit")
    async updatePartial(@Body() body: AuthUpdateDTO, @User() user){
        try {
            const result = await this.authService.updatePatch(body, user)
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Fazer o cadastro do usuário." })
    @ApiResponse({ status: 200, description: "Retorna um token de acesso quando terminar o processo de cadastro." })
    @ApiBody({ type: AuthUpdateDTO, description: "Dados do cadastro." })
    @Post("register")
    async register(@Body() body: AuthRegisterDTO) {
        try {
            const result = this.authService.register(body);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Rota para enviar token para caso o usuário tenha esquecido a senha." })
    @ApiResponse({ status: 200, description: "Retorna uma mensagem de sucesso caso o email seja enviado com sucesso." })
    @ApiBody({ type: AuthForgetDTO, description: "Email do usuário" })
    @Post("forget")
    async forget(@Body() body: AuthForgetDTO) { 
        try {
            const result = await this.authService.forget(body.email);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Rota para fazer o reset da senha" })
    @ApiResponse({ status: 200, description: "Se tudo funcionar vai retornar uma token de acesso." })
    @ApiBody({ type: AuthResetDTO, description: "Nova senha e token para executar o reset." })
    @Post("reset")
    async reset(@Body() body: AuthResetDTO) {
        try {
            const result = await this.authService.reset(body.password, body.token);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: "Rota para fazer a troca de senha." })
    @ApiResponse({ status: 200, description: "Se conclído com sucesso retorna true e uma mensagem de sucesso." })
    @ApiBody({ type: AuthChangePasswordDTO, description: "Nova senha." })
    @UseGuards(JwtAuthGuard)
    @Patch("change-pass")
    async changePassword(@Body() body: AuthChangePasswordDTO, @User() user){
        try {
            const result = await this.authService.changePassword(body.password, user);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}