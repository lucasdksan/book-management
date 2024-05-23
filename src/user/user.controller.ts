import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("users")
export class UserController {
    @Post()
    async create(@Body() body: CreateUserDTO){

    }
}