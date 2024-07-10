import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchBooksDto } from "./dto/search-books.dto";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt.guard";
import { RoleGuard } from "../../common/guards/role.guard";

@Roles(Role.Admin, Role.User)
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
@Controller("search")
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get("books")
    async searchBooks(@Query() searchCriteria: SearchBooksDto) {
        return this.searchService.searchBooks(searchCriteria);
    }
}
