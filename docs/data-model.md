# Data Model

## Overview

ระบบนี้ใช้ไฟล์ JSON เป็นแหล่งเก็บข้อมูลแทน Database โดยมีทั้งหมด 2 ไฟล์หลัก

1.  `course.json` -- เก็บข้อมูลรายวิชา
2.  `student.json` -- เก็บข้อมูลนักเรียนและการลงทะเบียนเรียน

ทั้งสองไฟล์ถูกอ่านและเขียนผ่าน Service ของ NestJS

------------------------------------------------------------------------

# 1. Course Data Model

ไฟล์: `course.json`

เก็บข้อมูลเป็น **Array ของ Course Object**

``` json
[
  {
    "courseId": "CS101",
    "courseName": "Introduction to Programming",
    "credits": 3,
    "category": "Computer Science",
    "status": "OPEN",
    "createdAt": "2026-03-01T10:00:00.000Z",
    "updatedAt": "2026-03-01T10:00:00.000Z"
  }
]
```

## Course Fields

  Field   |     Type      | Required |  Description
  courseId   |     string     | Yes | รหัสวิชา (ต้องไม่ซ้ำ)
  courseName   |   string     | Yes | ชื่อวิชา
  credits      number              Yes        หน่วยกิต (1--5)
  category     string              Yes        หมวดหมู่วิชา
  status       enum                Optional   สถานะวิชา
  createdAt    string (ISO Date)   Auto       วันที่สร้าง
  updatedAt    string (ISO Date)   Auto       วันที่อัปเดตล่าสุด

## Course Status Enum

-   OPEN
-   CLOSED
-   ARCHIVED

## Validation Rules

-   `courseId`
    -   ต้องเป็น string
    -   ห้ามว่าง
    -   ห้ามซ้ำกับ course อื่น
-   `courseName`
    -   ต้องเป็น string
    -   ห้ามว่าง
-   `credits`
    -   ต้องเป็น number
    -   ค่าอยู่ระหว่าง **1 -- 5**
-   `category`
    -   ต้องเป็น string
    -   ห้ามว่าง
-   `status`
    -   ต้องอยู่ใน Enum `CourseStatus`
    -   ค่า default = `OPEN`

------------------------------------------------------------------------

# 2. Student Data Model

ไฟล์: `student.json`

เก็บข้อมูลเป็น **Array ของ Student Object**

``` json
[
  {
    "id": "65001",
    "firstname": "Somchai",
    "lastname": "Jaidee",
    "email": "somchai@example.com",
    "password": "123456",
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

## Student Fields

  Field         Type     Required   Description
  ------------- -------- ---------- -------------------
  id            string   Yes        รหัสนักเรียน (ห้ามซ้ำ)
  firstname     string   Yes        ชื่อ
  lastname      string   Yes        นามสกุล
  email         string   Yes        อีเมล
  password      string   Yes        รหัสผ่าน
  age           number   Yes        อายุ
  sex           enum     Yes        เพศ
  status        enum     Yes        สถานะนักเรียน
  enrollments   array    Yes        รายวิชาที่ลงทะเบียน
  createdAt     string   Auto       วันที่สร้าง
  updatedAt     string   Auto       วันที่อัปเดต

------------------------------------------------------------------------

# Student Enums

## studentSex

-   MALE
-   FEMALE
-   OTHER

## studentStatus

-   ACTIVE
-   INACTIVE

------------------------------------------------------------------------

# Enrollment Data Model

อยู่ภายใน `student.enrollments`

``` json
{
  "courseId": "CS101",
  "courseName": "Introduction to Programming",
  "status": "ENROLLED"
}
```

## Enrollment Fields

  Field        Type     Required   Description
  ------------ -------- ---------- ------------------
  courseId     string   Yes        รหัสวิชา
  courseName   string   Yes        ชื่อวิชา
  status       enum     Yes        สถานะการลงทะเบียน

## Enrollment Status Enum

-   ENROLLED
-   WAITLISTED
-   DROPPED

------------------------------------------------------------------------

# Relationship Between Data

    Course (course.json)
            │
            │ courseId
            ▼
    Student.enrollments (student.json)

-   `student.enrollments.courseId` ต้องมีอยู่ใน `course.json`
-   ถ้าไม่มีระบบจะเกิด **BadRequestException**

------------------------------------------------------------------------

# Business Rules

## Course Rules

-   ห้ามสร้าง courseId ซ้ำ
-   credits ต้องอยู่ระหว่าง 1-5
-   status ต้องอยู่ใน enum

## Student Rules

-   id ห้ามซ้ำ
-   email ต้องเป็นรูปแบบ email
-   age ต้อง ≥ 0

## Enrollment Rules

ก่อนสร้างหรือแก้ไข student ระบบจะตรวจสอบว่า

`courseId` มีอยู่ใน `course.json` หรือไม่

ถ้าไม่พบจะเกิด

`BadRequestException`
