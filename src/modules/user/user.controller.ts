import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() body: CreateUserDTO){
        return this.userService.create(body);
    }

    @Get()
    async list(){
        return this.userService.list();
    }

    @Get(":id")
    async read(@Param("id") id){
        return this.userService.show(Number(id));
    }
}