import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdatePutBookDTO } from "./dto/update-put-book.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { CustomException } from "../../common/exceptions/custom-exception.exception";

@Controller("books")
export class BookController {
    constructor(private readonly bookService: BookService){}

    @Post()
    async create(@Body() body: CreateBookDTO){
        try {
            const result = await this.bookService.create(body);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async list(){
        try {
            const result = await this.bookService.list();
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(":id")
    async read(@ParamId() id:number){
        try {
            const result = await this.bookService.show(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(":id")
    async update(@Body() body: UpdatePutBookDTO, @ParamId() id:number){
        try {
            const result = await this.bookService.update(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePutBookDTO, @ParamId() id:number) {
        try {
            const result = await this.bookService.updatePatch(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(":id")
    async delete(@ParamId() id:number) {
        try {
            const result = await this.bookService.delete(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}