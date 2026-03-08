# API Specification -- Student & Course Management

## Base URL

http://localhost:3000

------------------------------------------------------------------------

#  1. Student Management API
จัดการข้อมูลนักเรียนและการลงทะเบียน


## 1.1 Get All Students
-Method: GET

-Endpoint: /students

-Description: ดึงข้อมูลนักเรียนทั้งหมดในระบบ

-Response (200 OK):

Response Example 
```
[
  {
    "id": "65001",
    "firstname": "Somchai",
    "lastname": "Jaidee",
    "email": "somchai@example.com",
    "age": 20,
    "sex": "MALE",
    "status": "ACTIVE",
    "enrollments": [
      {
        "courseId": "CS101",
        "courseName": "Introduction to Programming",
        "status": "ENROLLED"
      }
    ],
    "createdAt": "2026-03-01T10:00:00.000Z",
    "updatedAt": "2026-03-01T10:00:00.000Z"
  }
]
```

## 1.2 Get Student By ID

-Method: GET

-Endpoint: /students/{id}

-Example: GET /students/65001

# 1.3 Create Student

-Method: POST

-Endpoint: /students

-Request Body:
```
{
  "id": "65002",
  "firstname": "Suda",
  "lastname": "Dee",
  "email": "suda@example.com",
  "password": "password123",
  "age": 21,
  "sex": "FEMALE",
  "status": "ACTIVE",
  "enrollments": []
}
```

# 1.4 Update Student

-Method: PATCH

-Endpoint: /students/{id}

-Example: PATCH /students/65001

-Request Body: (ส่งเฉพาะฟิลด์ที่ต้องการแก้)
```
{
  "firstname": "Somchai Updated",
  "age": 22
}
```

# 1.5 Delete Student

-Method: DELETE

-Endpoint: /students/{id}

-Response (200 OK):
```
{
    success: true,
    message: `successfully deleted student ${id}`,
    data: "deleted",
};
```

------------------------------------------------------------------------

# 2. Course Management API
จัดการข้อมูลรายวิชาหลักในระบบ

## 2.1 Get All Courses

-Method: GET

-Endpoint: /courses

-Response Example:
```
[
  {
    "courseId": "CS101",
    "courseName": "Introduction to Programming",
    "credits": 3,
    "description": "Fundamental of programming",
    "category": "Core",
    "status": "OPEN",
    "createdAt": "2026-03-01T10:00:00.000Z",
    "updatedAt": "2026-03-01T10:00:00.000Z"
  }
]
```

## 2.2 Create Course

-Method: POST

-Endpoint: /courses

-Request Body:
```
{
  "courseId": "CS102",
  "courseName": "Data Structures",
  "credits": 3,
  "description": "Logic and Data structures",
  "category": "Core",
  "status": "OPEN"
}
```

## 2.3 Update Course

-Method: PATCH

-Endpoint: /courses/{courseId}

## 2.4 Delete Course

-Method: DELETE

-Endpoint: /courses/{courseId}

-Response (200 OK):
```
{
    success: true,
    message: `successfully deleted student ${id}`,
    data: "deleted",
};
```

------------------------------------------------------------------------

# Data Objects & Enums
Enrollment Object (อยู่ใน Student)

Field,      Type,       Description
courseId,   string,     รหัสวิชา (ต้องมีอยู่ในระบบ Course)
courseName, string,     ชื่อวิชา
status,     enum,       "ENROLLED, WAITLISTED, DROPPED"

## Student Status

-"ACTIVE, INACTIVE, SUSPENDED"

------------------------------------------------------------------------

# API Summary

Feature,    Method,  Endpoint
Students,   GET,     "/students, /students/{id}"
            POST,    /students
            PATCH,   /students/{id}
            DELETE,  /students/{id}
Courses,    GET,     "/courses, /courses/{id}"
            POST,    /courses
            PATCH,   /courses/{id}
            DELETE,  /courses/{id}
