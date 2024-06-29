import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { CustomException } from "../../common/exceptions/custom-exception.exception";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() body: CreateUserDTO){
        try {
            const result = await this.userService.create(body);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async list(){
        try {
            const result = await this.userService.list();
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(":id")
    async read(@ParamId() id:number){
        try {
            const result = await this.userService.show(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(":id")
    async update(@Body() body: UpdatePutUserDTO, @ParamId() id:number){
        try {
            const result = await this.userService.update(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchUserDTO, @ParamId() id:number) {
        try {
            const result = await this.userService.updatePatch(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(":id")
    async delete(@ParamId() id:number) {
        try {
            const result = await this.userService.delete(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}