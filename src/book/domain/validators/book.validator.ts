import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BookProps } from "../entities/book.entity";
import { ClassValidatorFields } from "../../../shared/domain/validators/class-validator-fields";

export class BookRules {
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
    
    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    state: string;
    
    @IsDate()
    @IsNotEmpty()
    publicationDate: Date;
    
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    constructor({ author, category, description, price, publicationDate, quantity, state, title, createdAt }: BookProps) {
        Object.assign(this, { author, category, description, price, publicationDate, quantity, state, title, createdAt });
    }
}

export class BookValidator extends ClassValidatorFields<BookProps> {
    validate(data: BookProps): boolean {
        return super.validate(new BookRules(data ?? {} as BookProps));
    }
}

export class BookValidatorFactory {
    static create(): BookValidator{
        return new BookValidator();
    }
}