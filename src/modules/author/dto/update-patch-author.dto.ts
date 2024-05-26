import { PartialType } from "@nestjs/mapped-types";
import { CreateAuthorDTO } from "./create-author.dto";

export class UpdatePatchAuthorDTO extends PartialType(CreateAuthorDTO) { }