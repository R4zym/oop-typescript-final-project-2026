import { IsString, IsEnum, IsNumber, Min, Max, IsOptional, IsNotEmpty } from 'class-validator';
import { CourseStatus } from './create-course.dto';

export class UpdateCourseDto {

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

export class UpdateAllCourseDto {
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