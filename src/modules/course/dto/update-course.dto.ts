import { IsString, IsEnum, IsNumber, Min, Max, IsOptional } from 'class-validator';
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