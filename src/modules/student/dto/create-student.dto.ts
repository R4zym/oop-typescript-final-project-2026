import { IsString, IsInt, IsEmail, IsOptional } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;
}
