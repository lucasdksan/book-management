import { faker } from "@faker-js/faker";
import { BookProps } from "../../entities/book.entity";

type Props = {
    author?: string;
    quantity?: number;
    category?: string;
    state?: string;
    publicationDate?: Date;
    description?: string;
    price?: number;
    title?: string;
    createdAt?: Date;
}

export function BookDataBuilder(props: Props): BookProps {
    return {
        author: props.author ?? faker.person.fullName(),
        category: props.category ?? faker.commerce.department(),
        description: props.description ?? faker.commerce.productDescription(),
        price: props.price ?? Number(faker.commerce.price()),
        quantity: props.quantity ?? Math.floor(Math.random() * 101),
        publicationDate: props.publicationDate ?? new Date(),
        createdAt: props.createdAt ?? new Date(),
        state: props.state ?? "",
        title: props.title ?? faker.commerce.productName(),
    }
}