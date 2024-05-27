import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";

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

    @Put(":id")
    async update(@Body() body: UpdatePutUserDTO, @Param("id") id){
        return this.userService.update(body, Number(id))
    }
}