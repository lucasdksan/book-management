import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDTO {
    @ApiProperty({ required: true, default: "Desenvolvedor" })
    @IsString()
    name: string;
}