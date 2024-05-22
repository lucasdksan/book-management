import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdatePutBookDTO } from "./dto/update-put-book.dto";

@Controller("books")
export class BookController {
    constructor(private readonly bookService: BookService){}

    @Post()
    async create(@Body() body: CreateBookDTO){
        return this.bookService.create(body);
    }

    @Get()
    async list(){
        return this.bookService.list();
    }

    @Get(":id")
    async read(@Param("id") id){
        return this.bookService.show(Number(id));
    }

    @Put(":id")
    async update(@Body() body: UpdatePutBookDTO, @Param("id") id){
        return this.bookService.update(body, Number(id));
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePutBookDTO, @Param("id") id) {
        return this.bookService.updatePatch(body, Number(id));
    }

    @Delete(":id")
    async delete(@Param("id") id) {
        return this.bookService.delete(Number(id))
    }
}