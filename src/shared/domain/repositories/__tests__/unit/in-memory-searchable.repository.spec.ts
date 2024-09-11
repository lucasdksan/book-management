import { Entity } from "../../../entities/entity";
import { InMemorySearchableRepository } from "../../in-memory-searchable.repository";
import { SearchParams, SearchResult } from "../../searchable-repository-contracts";

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
    sortableFields: string[] = ["name"];
    protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
        if(!filter) {
            return items;
        }

        return items.filter(item => {
            return item.props.name.toLowerCase().includes(filter.toLowerCase());
        });
    }
}

describe("ImMemorySearchableRepository unit test", ()=> {
    let sut: StubInMemorySearchableRepository;

    beforeEach(()=>{
        sut = new StubInMemorySearchableRepository();
    });

    describe("applayFilter method", ()=>{
        it("Should no filter items when filter param is null", async ()=> {
            const items = [new StubEntity({ name: "name value", price: 122 })];
            const spyFilterMethod = jest.spyOn(items, "filter");
            const itemsFiltered = await sut["applyFilter"](items, null);

            expect(itemsFiltered).toStrictEqual(items);
            expect(spyFilterMethod).not.toHaveBeenCalled();
        });

        it("Should filter using a filter param", async ()=> {
            const items = [
                new StubEntity({ name: "name value", price: 122 }),
                new StubEntity({ name: "TEST", price: 122 }),
                new StubEntity({ name: "test", price: 122 }),
                new StubEntity({ name: "fake", price: 122 })
            ];
            const spyFilterMethod = jest.spyOn(items, "filter");
            let itemsFiltered = await sut["applyFilter"](items, "TEST");

            expect(itemsFiltered).toStrictEqual([items[1], items[2]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(1);

            itemsFiltered = await sut["applyFilter"](items, "test");

            expect(itemsFiltered).toStrictEqual([items[1], items[2]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(2);

            itemsFiltered = await sut["applyFilter"](items, "null filter");

            expect(itemsFiltered).toHaveLength(0);
            expect(spyFilterMethod).toHaveBeenCalledTimes(3);
        });
    });

    describe("applaySort method", ()=>{
        it("Should filter using a filter param", async ()=>{
            const items = [
                new StubEntity({
                    name: "a",
                    price: 10,
                }),
                new StubEntity({
                    name: "b",
                    price: 15
                })
            ];

            let itemsSorted = await sut["applySort"](items, null, null);

            expect(itemsSorted).toStrictEqual(items);

            itemsSorted = await sut["applySort"](items, "price", "asc");

            expect(itemsSorted).toStrictEqual(items);
        });

        it("Should sort items", async ()=>{
            const items = [
                new StubEntity({
                    name: "b",
                    price: 10,
                }),
                new StubEntity({
                    name: "a",
                    price: 15
                }),
                new StubEntity({
                    name: "c",
                    price: 15
                })
            ];
            let itemsSorted = await sut["applySort"](items, "name", "asc");

            expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

            itemsSorted = await sut["applySort"](items, "name", "desc");

            expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
        });
    });

    describe("applayPaginate method", ()=>{
        it("Should paginate items", async ()=>{
            const items = [
                new StubEntity({
                    name: "b",
                    price: 10,
                }),
                new StubEntity({
                    name: "a",
                    price: 15
                }),
                new StubEntity({
                    name: "c",
                    price: 15
                }),
                new StubEntity({
                    name: "d",
                    price: 35
                }),
                new StubEntity({
                    name: "g",
                    price: 15
                }),
                new StubEntity({
                    name: "f",
                    price: 15
                }),
                new StubEntity({
                    name: "h",
                    price: 15
                })
            ];
            let itemsPaginated = await sut["applyPaginate"](items, 1, 2);

            expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

            itemsPaginated = await sut["applyPaginate"](items, 2, 2);

            expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

            itemsPaginated = await sut["applyPaginate"](items, 3, 2);

            expect(itemsPaginated).toStrictEqual([items[4], items[5]]);

            itemsPaginated = await sut["applyPaginate"](items, 4, 2);

            expect(itemsPaginated).toStrictEqual([items[6]]);
        });
    });

    describe("search method", ()=>{
        it("Should apply only pagination when the other params are null", async ()=>{
            const entity = new StubEntity({ name: "test", price: 50 });
            const items =  Array(16).fill(entity);
            sut.items = items;

            let params = await sut.search(new SearchParams());

            expect(params).toStrictEqual(new SearchResult({
                items: Array(15).fill(entity),
                total: 16,
                currentPage: 1,
                perPage: 15,
                filter: null,
                sort: null,
                sortDir: null
            }));
        });

        it("Should apply paginate and filter", async ()=>{
            const items = [
                new StubEntity({
                    name: "test",
                    price: 10,
                }),
                new StubEntity({
                    name: "a",
                    price: 15
                }),
                new StubEntity({
                    name: "TEST",
                    price: 15
                }),
                new StubEntity({
                    name: "TeSt",
                    price: 35
                }),
                new StubEntity({
                    name: "g",
                    price: 15
                }),
                new StubEntity({
                    name: "f",
                    price: 15
                }),
                new StubEntity({
                    name: "h",
                    price: 15
                })
            ];
            sut.items = items;

            let params = await sut.search(new SearchParams({
                page: 1,
                perPage: 2,
                filter: "TEST"
            }));

            expect(params).toStrictEqual(new SearchResult({
                items: [items[0], items[2]],
                total: 3,
                currentPage: 1,
                perPage: 2,
                filter: "TEST",
                sort: null,
                sortDir: null
            }));

            params = await sut.search(new SearchParams({
                page: 2,
                perPage: 2,
                filter: "TEST"
            }));

            expect(params).toStrictEqual(new SearchResult({
                items: [items[3]],
                total: 3,
                currentPage: 2,
                perPage: 2,
                filter: "TEST",
                sort: null,
                sortDir: null
            }));
        });

        it("Should apply paginate and sort", async ()=>{
            const items = [
                new StubEntity({
                    name: "b",
                    price: 10,
                }),
                new StubEntity({
                    name: "a",
                    price: 15
                }),
                new StubEntity({
                    name: "c",
                    price: 15
                }),
                new StubEntity({
                    name: "d",
                    price: 35
                }),
                new StubEntity({
                    name: "f",
                    price: 15
                }),
                new StubEntity({
                    name: "e",
                    price: 15
                }),
                new StubEntity({
                    name: "g",
                    price: 15
                })
            ];
            sut.items = items;

            let params = await sut.search(new SearchParams({
                page: 1,
                perPage: 2,
                sort: "name"
            }));

            expect(params).toStrictEqual(new SearchResult({
                items: [items[6], items[4]],
                total: 7,
                currentPage: 1,
                perPage: 2,
                filter: null,
                sort: "name",
                sortDir: "desc"
            }));

            params = await sut.search(new SearchParams({
                page: 2,
                perPage: 2,
                sort: "name"
            }));

            expect(params).toStrictEqual(new SearchResult({
                items: [items[5], items[3]],
                total: 7,
                currentPage: 2,
                perPage: 2,
                filter: null,
                sort: "name",
                sortDir: "desc"
            }));

            params = await sut.search(new SearchParams({
                page: 1,
                perPage: 2,
                sort: "name",
                sortDir: "asc"
            }));

            expect(params).toStrictEqual(new SearchResult({
                items: [items[1], items[0]],
                total: 7,
                currentPage: 1,
                perPage: 2,
                filter: null,
                sort: "name",
                sortDir: "asc"
            }));

            params = await sut.search(new SearchParams({
                page: 3,
                perPage: 2,
                sort: "name",
                sortDir: "asc"
            }));

            expect(params).toStrictEqual(new SearchResult({
                items: [items[5], items[4]],
                total: 7,
                currentPage: 3,
                perPage: 2,
                filter: null,
                sort: "name",
                sortDir: "asc"
            }));
        });

        it("Should search using paginate, sort  and filter", async ()=>{
            const items = [
                new StubEntity({
                    name: "test",
                    price: 10,
                }),
                new StubEntity({
                    name: "a",
                    price: 15
                }),
                new StubEntity({
                    name: "TEST",
                    price: 15
                }),
                new StubEntity({
                    name: "e",
                    price: 35
                }),
                new StubEntity({
                    name: "TeSt",
                    price: 15
                }),
                new StubEntity({
                    name: "f",
                    price: 15
                }),
                new StubEntity({
                    name: "h",
                    price: 15
                })
            ];
            sut.items = items;

            let params = await sut.search(new SearchParams({
                page: 1,
                perPage: 2,
                sort: "name",
                filter: "TEST"
            }));

            expect(params).toStrictEqual(new SearchResult({
                items: [items[0], items[4]],
                total: 3,
                currentPage: 1,
                perPage: 2,
                filter: "TEST",
                sort: "name",
                sortDir: "desc"
            }));

            params = await sut.search(new SearchParams({
                page: 2,
                perPage: 2,
                sort: "name",
                filter: "TEST"
            }));

            expect(params).toStrictEqual(new SearchResult({
                items: [items[2]],
                total: 3,
                currentPage: 2,
                perPage: 2,
                filter: "TEST",
                sort: "name",
                sortDir: "desc"
            }));
        });
    });
});