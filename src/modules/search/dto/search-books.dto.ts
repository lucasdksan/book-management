// src/modules/search/dto/search-books.dto.ts
import { IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class SearchBooksDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsInt()
    authorId?: number;

    @IsOptional()
    @IsInt()
    categoryId?: number;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    keyword?: string;
}
