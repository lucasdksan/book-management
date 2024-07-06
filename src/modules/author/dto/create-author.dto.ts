import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAuthorDTO {
    @ApiProperty({ required: true, default: "Lucas da Silva Leoncio" })
    @IsString()
    name: string;

    @ApiProperty({ required: true, default: "Um escritor legal" })
    @IsString()
    biography: string;
}