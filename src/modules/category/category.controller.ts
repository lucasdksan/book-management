import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdatePutCategoryDTO } from "./dto/update-put-category.dto";
import { UpdatePatchCategoryDTO } from "./dto/update-patch-category.dto";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { CustomException } from "../../common/exceptions/custom-exception.exception";

@Controller("/categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async create(@Body() body: CreateCategoryDTO) {
        try {
            const result = await this.categoryService.create(body);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async list() {
        try {
            const result = await this.categoryService.list();
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(":id")
    async read(@ParamId() id:number) {
        try {
            const result = await this.categoryService.show(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(":id")
    async update(@Body() body: UpdatePutCategoryDTO, @ParamId() id:number) {
        try {
            const result = await this.categoryService.update(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchCategoryDTO, @ParamId() id:number) {
        try {
            const result = await this.categoryService.updatePatch(body, id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(":id")
    async delete(@ParamId() id:number) {
        try {
            const result = await this.categoryService.delete(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}