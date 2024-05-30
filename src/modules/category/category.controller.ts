import { Body, Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdatePutCategoryDTO } from "./dto/update-put-category.dto";
import { UpdatePatchCategoryDTO } from "./dto/update-patch-category.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";

@Controller("/categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async create(@Body() body: CreateCategoryDTO) {
        return this.categoryService.create(body);
    }

    @Get()
    async list() {
        return this.categoryService.list();
    }

    @Get(":id")
    async read(@ParamId() id:number) {
        return this.categoryService.show(id);
    }

    @Put(":id")
    async update(@Body() body: UpdatePutCategoryDTO, @ParamId() id:number) {
        return this.categoryService.update(body, id);
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchCategoryDTO, @ParamId() id:number) {
        return this.categoryService.updatePatch(body, id);
    }

    @Delete(":id")
    async delete(@ParamId() id:number) {
        return this.categoryService.delete(id);
    }
}