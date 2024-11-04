# TimeTable API Documentation

## Overview

The TimeTable API provides endpoints for managing teachers, subjects, classes, students, and timetable entries in a school management system. Below are the available endpoints along with their descriptions, request formats, and expected responses.

### Base URL

```
http://localhost:3000/api/
```

### Required Packages

1. **express**: A web framework for Node.js that allows you to build web applications and APIs.
2. **dotenv**: A module that loads environment variables from a `.env` file into `process.env`. This is useful for managing configuration variables such as database connection strings.
3. **sqlite3**: A package that provides a simple interface for SQLite databases. This will allow you to interact with an SQLite database to store your data.

### Installation Instructions

1. **Initialize your project** (if you haven't done so already):

    ```bash
    npm init -y
    ```

2. **Install the required packages**:
    ```bash
    npm install express dotenv sqlite3
    ```

### Example of Creating a `.env` File

You may want to create a `.env` file in your project root to store configuration variables. Here’s an example:

```plaintext
PORT=3000
```

## Endpoints

### 1. Create a New Teacher

-   **URL:** `/teachers`
-   **Method:** `POST`

#### Request Body

```json
{
	"name": "Mr. Smith"
}
```

#### Response

The response will be a JSON object with the following schema:

```json
{
	"type": "object",
	"properties": {
		"id": {
			"type": "number"
		}
	}
}
```

---

### 2. Add Subject

-   **URL:** `/subjects`
-   **Method:** `POST`

#### Request Body

```json
{
	"name": "Mathematics"
}
```

#### Response

The response will be a JSON object with the following schema:

```json
{
	"type": "object",
	"properties": {
		"id": {
			"type": "number"
		}
	}
}
```

---

### 3. Create a New Class

-   **URL:** `/classes`
-   **Method:** `POST`

#### Request Body

```json
{
	"name": "Grade 12"
}
```

#### Response

The response will be a JSON object with the following schema:

```json
{
	"type": "object",
	"properties": {
		"id": {
			"type": "integer"
		}
	}
}
```

---

### 4. Create a New Student

-   **URL:** `/students`
-   **Method:** `POST`

#### Request Body

```json
{
	"name": "John Doe",
	"class_id": 1
}
```

#### Response

The response will be a JSON object with the following schema:

```json
{
	"id": "number"
}
```

---

### 5. Create Timetable Entry

-   **URL:** `/timetable`
-   **Method:** `POST`

#### Request Body

```json
{
	"date": "2024-11-05",
	"time": "09:00",
	"subject_id": 1,
	"teacher_id": 1,
	"class_id": 1
}
```

#### Response

The response will be a JSON object with the following schema:

```json
{
	"id": "integer"
}
```

---

### 6. Retrieve Timetable Information

-   **URL:** `/timetable`
-   **Method:** `GET`

#### Response

The response will be in JSON format with the following schema:

```json
[
	{
		"id": "number",
		"date": "string",
		"time": "string",
		"subject_name": "string",
		"teacher_name": "string",
		"class_name": "string"
	}
]
```

---

## Notes

-   Ensure the server is running on `http://localhost:3000` before making requests.
-   All date formats should follow the `YYYY-MM-DD` format.
-   For each endpoint, appropriate error handling should be implemented for invalid inputs and server issues.
