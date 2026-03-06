import { studentSex, studentStatus , enrollCourse } from "../students.enum"

export interface CourseEnrollment {
    courseName: string;
    status: enrollCourse; // ใช้ Enum เดิมที่คุณมี
}

export interface personInterface {
    id: string,
    firstname: string,
    lastname: string,
    age: number,
    sex: studentSex,
    status: studentStatus,
    createdAt: Date,
    updatedAt: Date,
    // เปลี่ยนจาก string[] และ enrollCourse แยกกัน 
    // เป็นการเก็บรวมกันใน Array เดียว
    enrollments: CourseEnrollment[] 
}