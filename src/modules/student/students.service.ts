import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto, EnrollmentDto } from './dto/student.dto';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';
import { Course } from '../course/courses.service';

@Injectable()
export class StudentService {
  // กำหนด Path ของไฟล์ JSON
  private readonly CoursePath = join(process.cwd(),"course.json")
  private readonly StudentPath = join(process.cwd(),"student.json")
  //private readonly studentPath = path.resolve(__dirname, '../student.json');
  //private readonly coursePath = path.resolve(__dirname, '../course.json');

  
  private readJsonFile<T>(filePath: string): T[] {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T[];
  }

  
  private writeJsonFile(filePath: string, data: Student[]): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  // ตรวจสอบวิชากับ course.json
  private validateEnrollments(enrollments: EnrollmentDto[]): void {
    const courses = this.readJsonFile<Course>(this.CoursePath);
    
    for (const item of enrollments) {
      
      const courseExists = courses.find(
        (c) => c.courseId === item.courseId && c.courseName === item.courseName
      );

      if (!courseExists) {
        
        const idOnly = courses.find(c => c.courseId === item.courseId);
        if (!idOnly) {
          throw new BadRequestException(`ไม่พบรหัสวิชา ${item.courseId} ในระบบ`);
        } else {
          throw new BadRequestException(`ชื่อวิชาไม่ถูกต้องสำหรับรหัส ${item.courseId} (คาดหวัง: ${idOnly.courseName})`);
        }
      }
    }
  }

  async findAll(): Promise<Student[]> {
    return this.readJsonFile<Student>(this.StudentPath);
  }

  async findOne(id: string): Promise<Student> {
    const students = await this.readJsonFile<Student>(this.StudentPath);
    const student = students.find(s => s.id === id);
    if (!student) throw new NotFoundException(`ไม่พบนักเรียนไอดี ${id}`);
    return student;
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const students = await this.readJsonFile<Student>(this.StudentPath);

    
    if (students.find(s => s.id === createStudentDto.id)) {
      throw new BadRequestException('ไอดีนักเรียนนี้มีอยู่ในระบบแล้ว');
    }

    this.validateEnrollments(createStudentDto.enrollments);

    const newStudent = {
      ...createStudentDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    students.push(newStudent);
    this.writeJsonFile(this.StudentPath, students);
    return newStudent;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    let students = await this.readJsonFile<Student>(this.StudentPath);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) throw new NotFoundException(`ไม่พบนักเรียนไอดี ${id}`);

    if (updateStudentDto.enrollments) {
      this.validateEnrollments(updateStudentDto.enrollments);
    }

    students[index] = {
      ...students[index],
      ...updateStudentDto,
      updatedAt: new Date().toISOString(),
    };

    this.writeJsonFile(this.StudentPath, students);
    return students[index];
  }

  async remove(id: string) {
    let students = await this.readJsonFile<Student>(this.StudentPath);
    const filteredStudents = students.filter(s => s.id !== id);

    if (students.length === filteredStudents.length) {
      throw new NotFoundException(`ไม่พบนักเรียนไอดี ${id}`);
    }

    this.writeJsonFile(this.StudentPath, filteredStudents);
    return { message: 'ลบข้อมูลเรียบร้อยแล้ว' };
  }
}

export interface Student extends CreateStudentDto {
    createdAt: string;
    updatedAt: string;
}