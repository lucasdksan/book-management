import { ReservationStatus } from "../src/common/enums/reservation-status.enum";

export const transactionList = [
    {
        id: 1,
        status: ReservationStatus.Returned,
        due_date: "2024-07-21T02:35:22.952Z",
        reservation_date: "2024-07-06T02:35:22.952Z",
        book: {
            id: 2,
            title: "Book 2"
        },
        user: {
            id: 1,
            email: "user1@gmail.com",
            name: "User 1"
        }
    },
    {
        id: 2,
        status: ReservationStatus.Returned,
        due_date: "2024-07-21T02:35:22.952Z",
        reservation_date: "2024-07-06T02:35:22.952Z",
        book: {
            id: 2,
            title: "Book 2"
        },
        user: {
            id: 2,
            email: "user2@gmail.com",
            name: "User 2"
        }
    }
];

export const transactionBookList = [
    {
        id: 1,
        status: ReservationStatus.Returned,
        due_date: "2024-07-21T02:35:22.952Z",
        reservation_date: "2024-07-21T02:35:22.952Z",
        book: null,
        user: {
            id: 1,
            email: "user1@gmail.com",
            name: "User 1"
        }
    },
    {
        id: 2,
        status: ReservationStatus.Returned,
        due_date: "2024-07-21T02:35:22.952Z",
        reservation_date: "2024-07-21T02:35:22.952Z",
        book: null,
        user: {
            id: 2,
            email: "user2@gmail.com",
            name: "User 2"
        }
    }
];

export const transactionUserList = [
    {
        id: 1,
        status: ReservationStatus.Returned,
        due_date: "2024-07-21T02:35:22.952Z",
        reservation_date: "2024-07-06T02:35:22.952Z",
        book: {
            id: 2,
            title: "Book 2"
        },
        user: null
    },
    {
        id: 2,
        status: ReservationStatus.Returned,
        due_date: "2024-07-21T02:35:22.952Z",
        reservation_date: "2024-07-06T02:35:22.952Z",
        book: {
            id: 2,
            title: "Book 2"
        },
        user: null
    }
];