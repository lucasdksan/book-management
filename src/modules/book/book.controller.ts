import { Body, Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdatePutBookDTO } from "./dto/update-put-book.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";

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
    async read(@ParamId() id:number){
        return this.bookService.show(id);
    }

    @Put(":id")
    async update(@Body() body: UpdatePutBookDTO, @ParamId() id:number){
        return this.bookService.update(body, id);
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePutBookDTO, @ParamId() id:number) {
        return this.bookService.updatePatch(body, id);
    }

    @Delete(":id")
    async delete(@ParamId() id:number) {
        return this.bookService.delete(id);
    }
}