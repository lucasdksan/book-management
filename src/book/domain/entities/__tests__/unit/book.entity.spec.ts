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

    it("should convert a entity to a JavaScript Object",()=> {
        const entity2 = new BookEntity(props, "12312312");

        expect(entity2.toJSON()).toStrictEqual({
            id: "12312312",
            ...props
        })
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

    describe("Updates", () => {
        it("should change in the author", ()=>{
            sut.updateAuthor("Outher author");
            expect(sut.author).toEqual("Outher author");
        });

        it("should change in the quantity", ()=>{
            sut.updateQuantity(100);
            expect(sut.quantity).toEqual(100);
        });

        it("should change in the category", ()=>{
            sut.updateCategory("New Category");
            expect(sut.category).toEqual("New Category");
        });

        it("should change in the State", ()=>{
            sut.updateState("free");
            expect(sut.state).toEqual("free");
        });

        it("should change in the Publication Date", ()=>{
            sut.updatePublicationDate(new Date());
            expect(sut.publicationDate).toEqual(new Date());
        });

        it("should change in the description", ()=>{
            sut.updateDescription("Um texto aleatorio");
            expect(sut.description).toEqual("Um texto aleatorio");
        });

        it("should change in the price", ()=>{
            sut.updatePrice(10);
            expect(sut.price).toEqual(10);
        });

        it("should change in the title", ()=>{
            sut.updateTitle("Novo titulo");
            expect(sut.title).toEqual("Novo titulo");
        });

        it("should change in the title", ()=>{
            sut.updateTitle("Outher Title");
            expect(sut.title).toEqual("Outher Title");
        });
    });
});