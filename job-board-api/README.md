# Job Board API

This API allows you to manage and interact with resources like users, jobs, applications and companies. It is built using Node.js and Express, and follows RESTful principles.

## Getting Started

### Prerequisites

- Node.js v16.x or higher
- MongoDB v4.x or higher

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ayaarragab/Learning-Node.js.git
cd job-board-api
npm install
```

## Running the API

```bash
npm run dev
```

The API will be running at http://localhost:3001.

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the JWT token in the `Authorization` header for all requests.

To obtain a token, use the /register endpoint with valid credentials.

## API Endpoints

### Users Routes

#### Create a New User

- **URL:** `/register`
- **Method:** `POST`
- **Description:** Creates a new user.
- **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "yourpassword",
    "status": "employed"
  }
  ```

- **Response:**

  ```json
  {
    "token": "flks324344jgklegfk43242425dsgopdzd" 
  }
  ```

#### Sign In

- **URL:** `/signin`
- **Method:** `POST`
- **Description:** Signin the user
- **Request Body:**

  ```json
  {
    "email": "johndoe@example.com",
    "password": "yourpassword"
  }
  ```

- **Response:**

  ```json
  {
    "token": "flks324344jgklegfk43242425dsgopdzd" 
  }
  ```

#### Get All Users

- **URL:** `/api/users`
- **Method:** `GET`
- **Description:** Retrieves a list of all users.
- **Response:**

  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "status": "employed"
      },
      ...
    ]
  }
  ```

### Company Routes

---

#### Get All Companies

- **Endpoint:** `GET /companies`
- **Description:** Retrieve a list of all companies.
- **Request:** No request body required.
- **Response:**
  - **200 OK:** Returns an array of all companies.
  - **500 Internal Server Error:** Server-side error occurred.
- **Example Response:**

  json

  `{
    "data": [...],
    "success": true,
    "message": "Here are all the companies"
}`

#### 2\. Get Company Info

- **Endpoint:** `GET /company`
- **Description:** Retrieve detailed information about a specific company.
- **Request:**
  - **Query Parameters:**
    - `companyName` (required): The name of the company.
- **Response:**
  - **200 OK:** Returns the company information.
  - **404 Not Found:** The company was not found.
- **Example Response:**

  json

  `{
    "data": {...},
    "success": true,
    "message": "Company information retrieved successfully."
}`

#### 3\. Create Company

- **Endpoint:** `POST /company`
- **Description:** Create a new company.
- **Request:**
  - **Body Parameters:**
    - `name` (required): The name of the company.
    - `description` (optional): Description of the company.
    - `location` (optional): The location of the company.
  - **Headers:**
    - `Authorization`: Bearer token of the CEO.
- **Response:**
  - **201 Created:** Company created successfully.
  - **400 Bad Request:** Invalid request data.
- **Example Response:**

  json

  `{
    "data": {...},
    "success": true,
    "message": "Company created successfully."
}`

#### 4\. Update Company Info

- **Endpoint:** `PUT /company`
- **Description:** Update information of an existing company.
- **Request:**
  - **Body Parameters:**
    - `name` (required): The name of the company.
    - `description` (optional): New description of the company.
    - `location` (optional): New location of the company.
  - **Headers:**
    - `Authorization`: Bearer token of the CEO.
- **Response:**
  - **200 OK:** Company information updated successfully.
  - **404 Not Found:** The company was not found.
- **Example Response:**

  json

  `{
    "data": {...},
    "success": true,
    "message": "Company information updated successfully."
}`

#### 5\. Delete Company

- **Endpoint:** `DELETE /company`
- **Description:** Delete a company.
- **Request:**
  - **Body Parameters:**
    - `name` (required): The name of the company to be deleted.
  - **Headers:**
    - `Authorization`: Bearer token of the CEO.
- **Response:**
  - **200 OK:** Company deleted successfully.
  - **404 Not Found:** The company was not found.
- **Example Response:**

  ```json

  {
    "data": [],
    "success": true,
    "message": "Company deleted successfully."
  }
    ```

---

### Job Routes

---

#### Get All Jobs

- **Endpoint:** `GET /company/jobs`
- **Description:** Retrieve a list of all jobs in a specific company.
- **Request:**
  - **Body Parameters:**
    - `id` (required): The ID of the company.
- **Response:**
  - **200 OK:** Returns a list of jobs.
  - **404 Not Found:** No jobs found for the company.
- **Example Response:**

  ```json 

  {
  "data": [...],
  "success": true,
  "message": "Here're all the jobs of [company name] company."
  }
    ```

#### 2\. Create Job

- **Endpoint:** `POST /company/jobs`
- **Description:** Create a new job posting.
- **Request:**
  - **Body Parameters:**
    - `title` (required): The title of the job.
    - `description` (optional): Job description.
    - `requirements` (optional): Job requirements.
    - `location` (optional): Job location.
    - `salary` (optional): Job salary.
    - `company` (required): The name of the company offering the job.
  - **Headers:**
    - `Authorization`: Bearer token of an authorized user.
- **Response:**
  - **201 Created:** Job created successfully.
  - **400 Bad Request:** Invalid request data.
- **Example Response:**

  ```json
  {
  "data": [...],
  "success": true,
  "message": "Job created successfully."
  }
  ```

#### 3\. Update Job

- **Endpoint:** `PUT /company/jobs`
- **Description:** Update an existing job.
- **Request:**
  - **Body Parameters:**
    - `title` (required): The title of the job to update.
    - `company` (required): The name of the company.
    - `update`: A dictionary of the fields to update (e.g., `location`, `salary`, `description`, etc.)
  - **Headers:**
    - `Authorization`: Bearer token of an authorized user.
- **Response:**
  - **200 OK:** Job updated successfully.
  - **404 Not Found:** Job not found.
- **Example Response:**

  ```json
  {
    "data": [...],
    "success": true,
    "message": "Your job's info updated successfully."
  }
  ```

#### 4\. Delete Job

- **Endpoint:** `DELETE /company/jobs`
- **Description:** Delete an existing job.
- **Request:**
  - **Body Parameters:**
    - `id` (required): The ID of the job to delete.
  - **Headers:**
    - `Authorization`: Bearer token of an authorized user.
- **Response:**
  - **200 OK:** Job deleted successfully.
  - **404 Not Found:** Job not found.
- **Example Response:**

  ```json

  {
    "data": [],
    "success": true,
    "message": "Job deleted successfully."
  }
  ```

#### 5\. Get Job

- **Endpoint:** `GET /:companyName/:jobTitle`
- **Description:** Retrieve a specific job by company name and job title.
- **Request:**
  - **Route Parameters:**
    - `companyName` (required): The name of the company offering the job.
    - `jobTitle` (required): The title of the job.
- **Response:**
  - **200 OK:** Returns the job details.
  - **404 Not Found:** Job not found.
- **Example Response:**

  ```json

  {
    "data": [...],
    "success": true,
    "message": "Here's job ([job title])."
  }
  ```
#### 6\. Get Company Jobs

- **Endpoint:** `GET /company/jobs`
- **Description:** Retrieve all jobs for a specific company.
- **Request:**
  - **Body Parameters:**
    - `id` (required): The ID of the company.
- **Response:**
  - **200 OK:** Returns all jobs for the specified company.
  - **404 Not Found:** Company or jobs not found.
- **Example Response:**

  ```json
    {
    "data": [...],
    "success": true,
    "message": "Here're all the jobs of [company name] company."
    }
    ```

---

### Employee Routes

---

#### Get Company Employees

- **Endpoint:** `GET /employees/company/:companyname`
- **Description:** Retrieve all employees for a specific company.
- **Request:**
  - **Route Parameters:**
    - `companyname` (required): The name of the company.
- **Response:**
  - **200 OK:** Returns all employees of the specified company.
  - **404 Not Found:** Company or employees not found.
- **Example Response:**

  ```json
    {
    "data": [...],
    "success": true,
    "message": "Here are the employees of [company name]."
    }
    ```

#### 2\. Delete Employee

- **Endpoint:** `DELETE /:companyName/employees`
- **Description:** Delete an employee from a specific company.
- **Request:**
  - **Body Parameters:**
    - `employeeId` (required): The ID of the employee to delete.
  - **Route Parameters:**
    - `companyName` (required): The name of the company.
  - **Headers:**
    - `Authorization`: Bearer token of the CEO.
- **Response:**
  - **200 OK:** Employee deleted successfully.
  - **404 Not Found:** Employee not found.
- **Example Response:**

  ```json
  {
   "data": [],
    "success": true,
    "message": "Employee deleted successfully."
  }
    ```
---

## Notes

- **Authorization:** Most routes require the user to be authenticated, and some routes require specific roles (e.g., CEO).
- **Error Handling:** Common error responses include `500 Internal Server Error` for unexpected issues and `404 Not Found` for resources that could not be located.

This documentation provides a comprehensive overview of the available endpoints, including their expected inputs and outputs.
