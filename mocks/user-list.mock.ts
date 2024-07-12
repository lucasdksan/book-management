import { Role } from "../src/common/enums/role.enum";

const setData = new Date("1998-11-07");

export const userList = [
	{
		"id": 2,
		"email": "user2@example.com",
		"name": "User 2",
		"createdAt": setData.toJSON(),
		"role": Role.User,
		"score": 10
	},
    {
		"id": 1,
		"email": "user12@example.com",
		"name": "User 12",
		"createdAt": setData.toJSON(),
		"role": Role.User,
		"score": 9
	}
]