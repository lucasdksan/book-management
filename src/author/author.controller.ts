import { AuthorService } from './author.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateAuthorDTO } from "./dto/create-author.dto";
import { UpdatePutAuthorDTO } from './dto/update-put-author.dto';
import { UpdatePatchAuthorDTO } from './dto/update-patch-author.dto';

@Controller("authors")
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Post()
    async create(@Body() body: CreateAuthorDTO){
        return this.authorService.create(body);
    }

    @Get()
    async list(){
        return this.authorService.list();
    }

    @Get(":id")
    async read(@Param("id") id){
        return this.authorService.show(Number(id));
    }

    @Put(":id")
    async update(@Body() body: UpdatePutAuthorDTO, @Param("id") id){
        return this.authorService.update(body, Number(id))
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchAuthorDTO, @Param("id") id) {
        return this.authorService.updatePatch(body, Number(id));
    }

    @Delete(":id")
    async delete(@Param("id") id) {
        return this.authorService.delete(Number(id));
    }
}