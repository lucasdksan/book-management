import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDTO } from "./create-category.dto";

export class UpdatePatchCategoryDTO extends PartialType(CreateCategoryDTO) { }