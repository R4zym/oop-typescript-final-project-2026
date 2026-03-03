import { studentSex, studentStatus } from "../student.enum"

export interface personInterface {
    id: string,
    firstname: string,
    lastname: string,
    age: number,
    sex: studentSex,
    status: studentStatus,
    createdAt: Date,
    updatedAt: Date
    courses: string[]
}