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

    get author(): string {
        return this.props.author;
    }

    get quantity(): number {
        return this.props.quantity;
    }

    get category(): string {
        return this.props.category;
    }

    get state(): string {
        return this.props.state;
    }

    get publicationDate(): Date {
        return this.props.publicationDate;
    }

    get description(): string {
        return this.props.description;
    }

    get price(): number {
        return this.props.price;
    }

    get title(): string {
        return this.props.title;
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
