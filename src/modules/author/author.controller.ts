import { AuthorService } from "./author.service";
import { Body, Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { CreateAuthorDTO } from "./dto/create-author.dto";
import { UpdatePutAuthorDTO } from "./dto/update-put-author.dto";
import { UpdatePatchAuthorDTO } from "./dto/update-patch-author.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";

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
    async read(@ParamId() id:number){
        return this.authorService.show(id);
    }

    @Put(":id")
    async update(@Body() body: UpdatePutAuthorDTO, @ParamId() id:number){
        return this.authorService.update(body, id);
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchAuthorDTO, @ParamId() id:number) {
        return this.authorService.updatePatch(body, id);
    }

    @Delete(":id")
    async delete(@ParamId() id:number) {
        return this.authorService.delete(id);
    }
}