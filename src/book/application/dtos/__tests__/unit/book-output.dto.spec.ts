import { BookEntity } from "../../../../domain/entities/book.entity";
import { BookDataBuilder } from "../../../../domain/testing/helpers/book-data.builder";
import { BookOutputMapper } from "../../book-output.dto";

describe("Book Output Mapper unit test", ()=>{
    it("should convert a book in output", ()=>{
        const entity = new BookEntity(BookDataBuilder({}));
        const spyToJson = jest.spyOn(entity, "toJSON");
        const sut = BookOutputMapper.toOutput(entity);

        expect(spyToJson).toHaveBeenCalled();
        expect(sut).toStrictEqual(entity.toJSON());
    });
});