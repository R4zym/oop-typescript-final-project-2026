import { IsString, IsEnum, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { CourseStatus } from './create-course.dto';

export class UpdateCourseDto {
    // เราจะไม่ใส่ courseId ที่นี่ เพราะปกติเราจะรับผ่าน @Param(':id') ใน Controller
    // และไม่ต้องการให้ผู้ใช้แก้ไขรหัสวิชาที่เป็น Primary Key

    @IsString()
    @IsOptional()
    courseName?: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    @IsOptional()
    credits?: number;

    @IsString()
    @IsOptional()
    category?: string;

    @IsEnum(CourseStatus)
    @IsOptional()
    status?: CourseStatus;
}