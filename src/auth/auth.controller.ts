import { AuthService } from "./auth.service";
import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../common/guards/local-auth.guard";
import { User } from "../common/decorators/user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt.guard";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { CustomException } from "../common/exceptions/custom-exception.exception";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService){}

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
}