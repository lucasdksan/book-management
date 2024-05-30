import { Body, Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";

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
    async read(@ParamId() id:number){
        return this.userService.show(id);
    }

    @Put(":id")
    async update(@Body() body: UpdatePutUserDTO, @ParamId() id:number){
        return this.userService.update(body, id);
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchUserDTO, @ParamId() id:number) {
        return this.userService.updatePatch(body, id);
    }

    @Delete(":id")
    async delete(@ParamId() id:number) {
        return this.userService.delete(id);
    }
}