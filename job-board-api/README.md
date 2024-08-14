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

### Applications Routes
------------------

#### Get All Applications for a User

-   **Endpoint:** `GET /applications`
-   **Description:** Retrieve all job applications submitted by the authenticated user.
-   **Response:**
    -   **200 OK:** Returns an array of the user's applications.
    -   **500 Internal Server Error:** Returns a message indicating a server issue.
    -   **401 Unauthorized:** Returns a message if the user is not signed in.
     -   **Example Response**
          -  *200 OK*
            ``` json
            {
                "data": [
                    {
                        "jobId": "12345",
                        "jobTitle": "Software Engineer",
                        "company": "Tech Corp",
                        "status": "submitted",
                        "submittedAt": "2024-01-01T12:00:00Z",
                        "resume": "URL to resume",
                        "coverLetter": "URL to cover letter"
                    },
                    {
                        "jobId": "67890",
                        "jobTitle": "Product Manager",
                        "company": "Innovate Inc",
                        "status": "in review",
                        "submittedAt": "2024-02-01T12:00:00Z",
                        "resume": "URL to resume",
                        "coverLetter": "URL to cover letter"
                    }
                ],
                "success": true,
                "message": "Here're your applications"
            }

              ```
          - *500 Internal Server Error*
          ```json
          {
          "data": [],
          "success": false,
          "message": "Server issue"
          }
          ```
        - *401 Unauthorized:*
        ```json
        {
          "data": [],
          "success": false,
          "message": "Please signin or register first"
        }
        ```

#### Delete All Applications for a User

-   **Endpoint:** `DELETE /applications`
-   **Description:** Delete all job applications submitted by the authenticated user.
-   **Response:**
    -   **200 OK:** Returns a message confirming the deletion of all applications.
    -   **500 Internal Server Error:** Returns a message indicating a server issue.
    -   **401 Unauthorized:** Returns a message if the user is not signed in.
-   **Example Response**
        - *200 OK*
        ``` json
        {
        "data": [],
        "success": true,
        "message": "Your applications have been canceled"
        }
        ```
      - **500 Internal Server Error**
      ``` json
      {
          "data": [],
          "success": false,
          "message": "Server issue"
      }
      ```
      - **401 Unauthorized**
      ``` json
      {
          "data": [],
          "success": false,
          "message": "Please signin or register first"
      }
      ```
      - **500 Internal server error**
      ```json
      {
          "data": [],
          "success": false,
          "message": "Failed to create application"
      }
      ```
    
#### Get a Specific Application

-   **Endpoint:** `GET /application/:jobId`
-   **Description:** Retrieve a specific job application by job ID for the authenticated user.
-   **Parameters:**
    -   **jobId** (in URL): The ID of the job for which the application was submitted.
-   **Response:**
    -   **200 OK:** Returns the application details and a message if the application exists.
    -   **400 Bad Request:** Returns a message if the application was not found or was deleted.
    -   **404 Not Found:** Returns a message if the job does not exist.
-   **Example Response**
        - *200 OK*
        ``` json
        {
            "data": [
                {
                    "jobId": "12345",
                    "jobTitle": "Software Engineer",
                    "company": "Tech Corp",
                    "status": "submitted",
                    "submittedAt": "2024-01-01T12:00:00Z",
                    "resume": "URL to resume",
                    "coverLetter": "URL to cover letter"
                }
            ],
            "success": true,
            "message": "Here's your application in Software Engineer"
        }

        ```

      - **400 Bad request**
      ``` json
      {
          "data": [],
          "success": false,
          "message": "You didn't apply for the Software Engineer position or you may have deleted it"
      }

      ```
      - **500 Internal server error**
      ```json
      {
          "data": [],
          "success": false,
          "message": "Failed to create application"
      }
      ```

#### Create a New Application

-   **Endpoint:** `POST /application/:jobId`
-   **Description:** Submit a new application for a job.
-   **Parameters:**
    -   **jobId** (in URL): The ID of the job to apply for.
-   **Request Body:**
    -   **resume** (string): The applicant's resume.
    -   **coverLetter** (string): The applicant's cover letter.
-   **Response:**
    -   **200 OK:** Returns the created application details and a success message.
    -   **404 Not Found:** Returns a message if the job or user is not found.
    -   **500 Internal Server Error:** Returns a message if the application could not be created.
- *Request Example*:
  ```json
  {
      "resume": "URL to the resume or the resume content as a string",
      "coverLetter": "URL to the cover letter or the cover letter content as a string"
  }

  ```
- *response Example*:
  - *200 OK*
  ```json
    {
      "data": [
          {
              "application": {
                  "applicant": "User ID",
                  "resume": "URL to resume",
                  "coverLetter": "URL to cover letter",
                  "job": "Job ID",
                  "status": "pending"
              },
              "jobTitle": "Software Engineer"
          }
      ],
      "success": true,
      "message": "You successfully applied to Software Engineer position"
  }
  ```
  - *404 Not found*
  ```json
  {
        "data": [],
        "success": false,
        "message": "Job not found"
  }
  ```
  - *500 Internal Server Error*
  ```json
    {
        "data": [],
        "success": false,
        "message": "Failed to create application"
    }
  ```
#### Delete a Specific Application

-   **Endpoint:** `DELETE /application/:jobId`
-   **Description:** Delete a specific job application by job ID for the authenticated user.
-   **Parameters:**
    -   **jobId** (in URL): The ID of the job for which the application was submitted.
-   **Response:**
    -   **200 OK:** Returns a message confirming the deletion of the application.
    ```json
    {
    "data": [],
    "success": true,
    "message": "Your application in Software Engineer has been deleted"
    }
    ```
    -   **400 Bad Request:** Returns a message if the application was not found or was deleted.
    ```json
    {
    "data": [],
    "success": false,
    "message": "You didn't apply for the Software Engineer position"
    }
    ```
    -   **404 Not Found:** Returns a message if the job does not exist.
    ```json
    {
    "data": [],
    "success": false,
    "message": "This job doesn't exist"
    }
    ```

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
