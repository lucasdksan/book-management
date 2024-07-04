import { AuthService } from "./auth.service";
import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { LocalAuthGuard } from "../common/guards/local-auth.guard";
import { User } from "../common/decorators/user.decorator";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req){
        return this.authService.login(req.user);
    }
}