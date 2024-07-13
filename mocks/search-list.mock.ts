const setData = new Date("1998-11-07");

export const searchList = [
    {
		"id": 1,
		"title": "Book 1",
		"description": "Description of Book 1",
		"price": 1000,
		"publication_date": setData,
		"quantity": 10,
		"author_id": 1,
		"categorie_id": 1,
		"created_at": setData,
		"update_at": setData,
		"author": {
			"id": 1,
			"name": "Author 1",
			"biography": "Biography of Author 1",
			"created_at": setData,
			"update_at": setData
		},
		"categorie": {
			"id": 1,
			"name": "Category 1",
			"created_at": setData,
			"update_at": setData
		}
	}
];