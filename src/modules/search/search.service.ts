import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { SearchBooksDto } from "./dto/search-books.dto";

@Injectable()
export class SearchService {
    constructor(private readonly prisma: PrismaService) {}

    async searchBooks(searchCriteria: SearchBooksDto) {
        const { title, authorId, categoryId, startDate, endDate, keyword } = searchCriteria;

        return this.prisma.books.findMany({
            where: {
                AND: [
                    title ? { title: { contains: title, } } : {},
                    authorId ? { author_id: authorId } : {},
                    categoryId ? { categorie_id: categoryId } : {},
                    startDate ? { publication_date: { gte: new Date(startDate) } } : {},
                    endDate ? { publication_date: { lte: new Date(endDate) } } : {},
                    keyword ? { OR: [
                        { title: { contains: keyword, } },
                        { description: { contains: keyword, } }
                    ] } : {},
                ],
            },
            include: {
                author: true,
                categorie: true
            },
        });
    }
}
