import { SearchableRepositoryInterface, SearchParams as DefaultSearchParams, SearchResult as DefaultSearchResult } from "../../../shared/domain/repositories/searchable-repository-contracts";
import { BookEntity } from "../entities/book.entity";

export namespace BookRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> {}

    export class SearchResult extends DefaultSearchResult<BookEntity, Filter> {}

    export interface Repository extends SearchableRepositoryInterface<BookEntity, Filter, SearchParams, SearchResult> {
        findByEmail(email: string): Promise<BookEntity>;
        emailExists(email: string): Promise<void>;
    }
}