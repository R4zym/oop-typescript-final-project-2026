import { 
  IsString, 
  IsEmail, 
  IsNumber, 
  IsEnum, 
  IsArray, 
  ValidateNested, 
  IsOptional, 
  Min, 
  IsNotEmpty 
} from 'class-validator';
import { Type } from 'class-transformer';

// --- Enums ---
export enum enrollStatus {
    ENROLLED = 'ENROLLED',
    WAITLISTED = 'WAITLISTED',
    DROPPED = 'DROPPED'
}

export enum studentSex {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export enum studentStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}


export class EnrollmentDto {
    @IsString()
    @IsNotEmpty()
    courseId!: string;

    @IsString()
    @IsNotEmpty()
    courseName!: string;

    @IsEnum(enrollStatus)
    status!: enrollStatus;
}

// --- 1. Create Student DTO (บังคับใส่ข้อมูลทั้งหมด) ---
export class CreateStudentDto {
    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุรหัสนักศึกษา' })
    id!: string;

    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุชื่อ' })
    firstname!: string;

    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุนามสกุล' })
    lastname!: string;

    @IsEmail({}, { message: 'รูปแบบอีเมลไม่ถูกต้อง' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุรหัสผ่าน' })
    password!: string;

    @IsNumber()
    @Min(0)
    age!: number;

    @IsEnum(studentSex)
    sex!: studentSex;

    @IsEnum(studentStatus)
    status!: studentStatus;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EnrollmentDto)
    enrollments!: EnrollmentDto[];
}

// --- 2. Update Student DTO (ทุกอย่างเป็น Optional) ---
export class UpdateStudentDto {
    @IsOptional()
    @IsString()
    firstname?: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    age?: number;

    @IsOptional()
    @IsEnum(studentSex)
    sex?: studentSex;

    @IsOptional()
    @IsEnum(studentStatus)
    status?: studentStatus;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EnrollmentDto)
    enrollments?: EnrollmentDto[];
}

export class UpdateAllStudentDto {
    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุรหัสนักศึกษา' })
    id!: string;

    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุชื่อ' })
    firstname!: string;

    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุนามสกุล' })
    lastname!: string;

    @IsEmail({}, { message: 'รูปแบบอีเมลไม่ถูกต้อง' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'กรุณาระบุรหัสผ่าน' })
    password!: string;

    @IsNumber()
    @Min(0)
    age!: number;

    @IsEnum(studentSex)
    sex!: studentSex;

    @IsEnum(studentStatus)
    status!: studentStatus;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => EnrollmentDto)
    enrollments!: EnrollmentDto[];
}