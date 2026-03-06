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
    sex: "MALE" | "FEMALE" | "OTHER";
    status: "ACTIVE" | "INACTIVE" | "GRADUATED" | "DROPPED_OUT";
    enrollments: EnrollmentInterface[];
    createdAt: string;
    updatedAt: string;
}