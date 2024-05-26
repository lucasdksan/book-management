import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdatePutCategoryDTO } from "./dto/update-put-category.dto";
import { UpdatePatchCategoryDTO } from "./dto/update-patch-category.dto";

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
    async read(@Param("id") id) {
        return this.categoryService.show(Number(id));
    }

    @Put(":id")
    async update(@Body() body: UpdatePutCategoryDTO, @Param("id") id) {
        return this.categoryService.update(body, Number(id))
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchCategoryDTO, @Param("id") id) {
        return this.categoryService.updatePatch(body, Number(id));
    }

    @Delete(":id")
    async delete(@Param("id") id) {
        return this.categoryService.delete(Number(id));
    }
}