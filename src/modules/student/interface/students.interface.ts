import { studentSex, studentStatus , enrollStatus } from "../students.enum"

export interface EnrollmentInterface {
    courseId: string;
    courseName: string;
    status: enrollStatus; // ใช้ Enum
}

export interface PersonInterface {
    id: string;
    firstname: string;
    lastname: string;
    email: string;         // เพิ่ม email
    password: string;      // เพิ่ม password (ในงานจริงควรมีการ Hash)
    age: number;
    sex: studentSex;
    status: studentStatus;
    enrollments: EnrollmentInterface[];
    createdAt: string;
    updatedAt: string;
}