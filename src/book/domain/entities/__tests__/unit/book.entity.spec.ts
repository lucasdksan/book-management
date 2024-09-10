import { BookDataBuilder } from "../../../testing/helpers/book-data.builder";
import { BookEntity, BookProps } from "../../book.entity";

describe("Book entity unit tests", () => {
    let props: BookProps;
    let sut: BookEntity;

    beforeEach(() => {
        BookEntity.validate = jest.fn();
        props = BookDataBuilder({});
        sut = new BookEntity(props);
    });

    it("Constructor Method", () => {
        expect(BookEntity.validate).toHaveBeenCalled();
        expect(sut.props).toStrictEqual(props);
        expect(sut.createdAt).toBeInstanceOf(Date);
    });

    describe("Getters", () => {
        it("should return the correct author", () => {
            expect(sut.author).toEqual(props.author);
            expect(typeof sut.author).toBe("string");
        });

        it("should return the correct category", () => {
            expect(sut.category).toEqual(props.category);
            expect(typeof sut.category).toBe("string");
        });

        it("should return the correct description", () => {
            expect(sut.description).toEqual(props.description);
            expect(typeof sut.description).toBe("string");
        });

        it("should return the correct price", () => {
            expect(sut.price).toEqual(props.price);
            expect(typeof sut.price).toBe("number");
        });

        it("should return the correct publicationDate", () => {
            expect(sut.publicationDate).toEqual(props.publicationDate);
            expect(sut.publicationDate).toBeInstanceOf(Date);
        });

        it("should return the correct quantity", () => {
            expect(sut.quantity).toEqual(props.quantity);
            expect(typeof sut.quantity).toBe("number");
        });

        it("should return the correct state", () => {
            expect(sut.state).toEqual(props.state);
            expect(typeof sut.state).toBe("string");
        });

        it("should return the correct title", () => {
            expect(sut.title).toEqual(props.title);
            expect(typeof sut.title).toBe("string");
        });

        it("should return the correct createdAt", () => {
            expect(sut.createdAt).toBeInstanceOf(Date);
        });
    });
});