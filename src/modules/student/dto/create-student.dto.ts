import { IsString, IsEmail, IsOptional, IsNotEmpty, IsNumber, IsEnum} from 'class-validator';
import { CourseEnrollment } from '../interface/students.interface';

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    sex: studentSex;

    @IsEnum()
    @IsNotEmpty()
    status: studentStatus;

    @IsString()
    @IsNotEmpty()
    enrollments: CourseEnrollment[];

    @IsString()
    @IsNotEmpty()
    createdAt: Date;

    @IsString()
    @IsNotEmpty()
    updatedAt: Date;

}
