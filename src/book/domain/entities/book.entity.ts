import { Entity } from "../../../shared/domain/entities/entity";
import { EntityValidationError } from "../../../shared/domain/errors/validation.error";
import { BookValidatorFactory } from "../validators/book.validator";

export type BookProps = {
    author: string;
    quantity: number;
    category: string;
    state: string;
    publicationDate: Date;
    description: string;
    price: number;
    title: string;
    createdAt?: Date;
}

export class BookEntity extends Entity<BookProps> {
    constructor(public readonly props: BookProps, id?: string) {
        BookEntity.validate(props);
        
        super(props, id);
        this.props.createdAt = this.props.createdAt ?? new Date();
    }

    updateAuthor(value: string){
        BookEntity.validate({ ...this.props, author: value });
        this.author = value;
    }

    get author(): string {
        return this.props.author;
    }

    private set author(value: string) {
        this.props.author = value;
    }

    updateQuantity(value: number){
        BookEntity.validate({ ...this.props, quantity: value });
        this.quantity = value;
    }

    get quantity(): number {
        return this.props.quantity;
    }

    private set quantity(value: number) {
        this.props.quantity = value;
    }

    updateCategory(value: string){
        BookEntity.validate({ ...this.props, category: value });
        this.category = value;
    }

    get category(): string {
        return this.props.category;
    }

    private set category(value: string) {
        this.props.category = value;
    }

    updateState(value: string){
        BookEntity.validate({ ...this.props, state: value });
        this.state = value;
    }

    get state(): string {
        return this.props.state;
    }

    private set state(value: string) {
        this.props.state = value;
    }

    updatePublicationDate(value: Date){
        BookEntity.validate({ ...this.props, publicationDate: value });
        this.publicationDate = value;
    }

    get publicationDate(): Date {
        return this.props.publicationDate;
    }

    private set publicationDate(value: Date) {
        this.props.publicationDate = value;
    }

    updateDescription(value: string){
        BookEntity.validate({ ...this.props, description: value });
        this.description = value;
    }

    get description(): string {
        return this.props.description;
    }

    private set description(value: string) {
        this.props.description = value;
    }

    updatePrice(value: number){
        BookEntity.validate({ ...this.props, price: value });
        this.price = value;
    }

    get price(): number {
        return this.props.price;
    }

    private set price(value: number) {
        this.props.price = value;
    }

    updateTitle(value: string){
        BookEntity.validate({ ...this.props, title: value });
        this.title = value;
    }

    get title(): string {
        return this.props.title;
    }

    private set title(value: string) {
        this.props.title = value;
    }

    get createdAt(): Date {
        return this.props.createdAt!;
    }

    static validate(props: BookProps): void {
        const validator = BookValidatorFactory.create();
        const isValid = validator.validate(props);

        if (!isValid) {
            throw new EntityValidationError(validator.errors);
        }
    }
}
