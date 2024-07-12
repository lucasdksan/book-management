import { ReservationStatus } from "../src/common/enums/reservation-status.enum";

export const reservationList = [
    {
		"id": 21,
		"status": ReservationStatus.Returned,
		"due_date": "2024-07-20T02:27:39.953Z",
		"reservation_date": "2024-07-05T02:27:39.953Z",
		"book": {
			"id": 2,
			"title": "Book 2"
		},
		"user": null
	},
	{
		"id": 22,
		"status": ReservationStatus.Returned,
		"due_date": "2024-07-20T02:27:44.091Z",
		"reservation_date": "2024-07-05T02:27:44.091Z",
		"book": {
			"id": 2,
			"title": "Book 2"
		},
		"user": null
	},
	{
		"id": 23,
		"status": ReservationStatus.Returned,
		"due_date": "2024-07-20T02:33:07.960Z",
		"reservation_date": "2024-07-05T02:33:07.960Z",
		"book": {
			"id": 2,
			"title": "Book 2"
		},
		"user": null
	}
];