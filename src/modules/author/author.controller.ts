import { AuthorService } from "./author.service";
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put } from "@nestjs/common";
import { CreateAuthorDTO } from "./dto/create-author.dto";
import { UpdatePutAuthorDTO } from "./dto/update-put-author.dto";
import { UpdatePatchAuthorDTO } from "./dto/update-patch-author.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { CustomException } from "../../common/exceptions/custom-exception.exception";

@Controller("authors")
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Post()
    async create(@Body() body: CreateAuthorDTO){
        try {
            const result = await this.authorService.create(body);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async list(){
        try {
            const result = await this.authorService.list();
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(":id")
    async read(@ParamId() id:number){
        try {
            const result = await this.authorService.show(id);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(":id")
    async update(@Body() body: UpdatePutAuthorDTO, @ParamId() id:number){
        try {
            const result = await this.authorService.update(body, id);
            return result
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchAuthorDTO, @ParamId() id:number) {
        try {
            const result = await this.authorService.updatePatch(body, id);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(":id")
    async delete(@ParamId() id:number) {
        try {
            const result = await this.authorService.delete(id);
            return result;
        } catch (error) {
            if(error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}