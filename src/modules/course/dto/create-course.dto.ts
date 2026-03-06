import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class createCourseDto {
    @IsString()
    @IsNotEmpty()
    courseId!: string

    @IsString()
    @IsNotEmpty()
    courseName!: string

    @IsEnum()
    @IsNotEmpty()
    status!: string
    
}