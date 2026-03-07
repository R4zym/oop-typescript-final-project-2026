# API Specification -- Student Management

## Base URL

http://localhost:3000

API สำหรับจัดการข้อมูลนักเรียน (Students)

------------------------------------------------------------------------

# 1. Get All Students

GET /students

ดึงข้อมูลนักเรียนทั้งหมด

Response Example \[ { "id": "65001", "firstname": "Somchai", "lastname":
"Jaidee", "email": "somchai@example.com", "password": "123456", "age":
20, "sex": "MALE", "status": "ACTIVE", "enrollments": \[ { "courseId":
"CS101", "courseName": "Introduction to Programming", "status":
"ENROLLED" } \], "createdAt": "2026-03-01T10:00:00.000Z", "updatedAt":
"2026-03-01T10:00:00.000Z" }\]

------------------------------------------------------------------------

# 2. Get Student By ID

GET /students/{id}

Example GET /students/65001

------------------------------------------------------------------------

# 3. Create Student

POST /students

Request Example

{ "id": "65002", "firstname": "Suda", "lastname": "Dee", "email":
"suda@example.com", "password": "123456", "age": 21, "sex": "FEMALE",
"status": "ACTIVE", "enrollments": \[ { "courseId": "CS101",
"courseName": "Introduction to Programming", "status": "ENROLLED" } \] }

------------------------------------------------------------------------

# 4. Update Student

PATCH /students/{id}

Example PATCH /students/65001

Request Example

{ "firstname": "Somchai Updated", "age": 22 }

------------------------------------------------------------------------

# 5. Delete Student

DELETE /students/{id}

Example DELETE /students/65001

Response

{ "message": "ลบข้อมูลเรียบร้อยแล้ว" }

------------------------------------------------------------------------

# Enrollment Object

{ "courseId": "CS101", "courseName": "Introduction to Programming",
"status": "ENROLLED" }

Status: ENROLLED WAITLISTED DROPPED

------------------------------------------------------------------------

# API Summary

GET /students GET /students/{id} POST /students PATCH /students/{id}
DELETE /students/{id}
