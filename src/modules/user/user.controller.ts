import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

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

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchUserDTO, @Param("id") id) {
        return this.userService.updatePatch(body, Number(id));
    }
}