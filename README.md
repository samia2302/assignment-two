# DevPulse API

A RESTful backend API for managing internal software team issues and feature requests. DevPulse helps contributors and maintainers collaborate by reporting bugs, suggesting new features, tracking issue status, and managing workflows efficiently.

## Live URL

https://assignmenttwo-drab.vercel.app/

## Features

### Authentication & Authorization

* User Registration
* User Login with JWT Authentication
* Password Hashing using bcrypt
* Role-Based Access Control (Contributor & Maintainer)

### Issue Management

* Create Bug Reports and Feature Requests
* View All Issues
* View Single Issue Details
* Filter Issues by Type
* Filter Issues by Status
* Sort Issues by Newest or Oldest
* Update Issues
* Delete Issues (Maintainer Only)

### Security Features

* JWT Protected Routes
* Passwords Never Returned in Responses
* Role Verification Middleware
* Input Validation
* Centralized Error Handling

---

## Technology Stack

* Node.js
* TypeScript
* Express.js
* PostgreSQL
* Raw SQL (pool.query)
* bcrypt
* jsonwebtoken
* dotenv
* cors
* http-status-codes

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/samia2302/assignment-two.git

cd assignment-two
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_jwt_secret

BCRYPT_SALT_ROUNDS=10
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/signup
```

Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@devpulse.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request Body

```json
{
  "email": "john.doe@devpulse.com",
  "password": "securePassword123"
}
```

---

## Issues

### Create Issue

```http
POST /api/issues
```

Protected Route

---

### Get All Issues

```http
GET /api/issues
```

Optional Query Parameters

```http
/api/issues?sort=newest

/api/issues?sort=oldest

/api/issues?type=bug

/api/issues?type=feature_request

/api/issues?status=open

/api/issues?status=in_progress

/api/issues?status=resolved
```

---

### Get Single Issue

```http
GET /api/issues/:id
```

---

### Update Issue

```http
PATCH /api/issues/:id
```

Protected Route

Rules:

* Maintainer can update any issue.
* Contributor can update only their own issue.
* Contributor can update only when issue status is `open`.

---

### Delete Issue

```http
DELETE /api/issues/:id
```

Protected Route

Rules:

* Maintainer only.

---

# Database Schema

## Users Table

| Column     | Type                |
| ---------- | ------------------- |
| id         | SERIAL PRIMARY KEY  |
| name       | VARCHAR(100)        |
| email      | VARCHAR(255) UNIQUE |
| password   | TEXT                |
| role       | VARCHAR(20)         |
| created_at | TIMESTAMP           |
| updated_at | TIMESTAMP           |

---

## Issues Table

| Column      | Type               |
| ----------- | ------------------ |
| id          | SERIAL PRIMARY KEY |
| title       | VARCHAR(150)       |
| description | TEXT               |
| type        | VARCHAR(30)        |
| status      | VARCHAR(30)        |
| reporter_id | INTEGER            |
| created_at  | TIMESTAMP          |
| updated_at  | TIMESTAMP          |

---

## User Roles

### Contributor

* Register and Login
* Create Issues
* View Issues
* Update Own Open Issues

### Maintainer

* All Contributor Permissions
* Update Any Issue
* Delete Any Issue
* Manage Issue Workflow Status

---

## Error Handling

Standard Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": "Error details"
}
```

---

## Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## Deployment

Backend deployed on:

* Vercel

Database Provider:

* Neon

---

## Author

Developed as part of the DevPulse Backend API Assignment using Node.js, TypeScript, Express.js, PostgreSQL, and Raw SQL.
