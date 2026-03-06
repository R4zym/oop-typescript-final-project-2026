import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { CourseStatus } from './create-course.dto'; // Import enum จากไฟล์สร้าง

export class UpdateCourseDto {
    // ปกติ courseId มักจะเป็น Unique Key ไม่ค่อยแก้กัน 
    // แต่ถ้าต้องการให้แก้ได้ ก็ใส่ @IsOptional ไว้ครับ
    @IsString()
    @IsOptional()
    @MinLength(3)
    courseId?: string;

    @IsString()
    @IsOptional()
    courseName?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(CourseStatus)
    @IsOptional()
    status?: CourseStatus;

    @IsString()
    @IsOptional()
    instructorName?: string;
}