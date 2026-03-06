import { IsString, IsNotEmpty, IsEnum, IsOptional, MinLength } from 'class-validator';

// อ้างอิงจาก EnrollStatus ที่เราออกแบบไว้ก่อนหน้า
export enum CourseStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    ARCHIVED = "ARCHIVED"
}

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty({ message: 'Course ID is required' })
    @MinLength(3, { message: 'Course ID must be at least 3 characters long' })
    courseId!: string; // เช่น CS101, PH102

    @IsString()
    @IsNotEmpty({ message: 'Course name is required' })
    courseName!: string; // เช่น Mathematics, Physics

    @IsString()
    @IsOptional()
    description?: string; // คำอธิบายวิชา (ถ้ามี)

    @IsEnum(CourseStatus, { message: 'Invalid course status' })
    @IsOptional()
    status?: CourseStatus = CourseStatus.OPEN; // ค่าเริ่มต้นเป็น OPEN

    @IsString()
    @IsOptional()
    instructorName?: string; // ชื่อผู้สอน
}