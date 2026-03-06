import { IsString, IsNotEmpty, IsEnum, IsNumber, Min, Max, IsOptional } from 'class-validator';

export enum CourseStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    ARCHIVED = "ARCHIVED"
}

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุรหัสวิชา' })
    courseId!: string;

    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุชื่อวิชา' })
    courseName!: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    @IsNotEmpty({ message: 'กรุณาระบุหน่วยกิต (1-5)' })
    credits!: number;

    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุหมวดหมู่' })
    category!: string;

    @IsEnum(CourseStatus)
    @IsOptional()
    status?: CourseStatus = CourseStatus.OPEN;
}