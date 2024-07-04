import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const salt = await bcrypt.genSalt();
    const author1 = await prisma.authors.create({
        data: {
            name: "Author 1",
            biography: "Biography of Author 1",
        },
    });

    const author2 = await prisma.authors.create({
        data: {
            name: "Author 2",
            biography: "Biography of Author 2",
        },
    });

    const category1 = await prisma.categories.create({
        data: {
            name: "Category 1",
        },
    });

    const category2 = await prisma.categories.create({
        data: {
            name: "Category 2",
        },
    });

    const book1 = await prisma.books.create({
        data: {
            title: "Book 1",
            description: "Description of Book 1",
            price: 1000,
            quantity: 10,
            publication_date: new Date("2023-01-01"),
            author_id: author1.id,
            categorie_id: category1.id,
        },
    });

    const book2 = await prisma.books.create({
        data: {
            title: "Book 2",
            description: "Description of Book 2",
            price: 1500,
            quantity: 10,
            publication_date: new Date("2023-01-01"),
            author_id: author2.id,
            categorie_id: category2.id,
        },
    });

    const user1 = await prisma.users.create({
        data: {
            name: "User 1",
            email: "user1@example.com",
            password: await bcrypt.hash("password1", salt),
        },
    });

    const user2 = await prisma.users.create({
        data: {
            name: "User 2",
            email: "user2@example.com",
            password: await bcrypt.hash("password2", salt),
        },
    });

    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });