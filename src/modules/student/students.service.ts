import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto, EnrollmentDto } from './dto/student.dto';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';

@Injectable()
export class StudentService {
  // กำหนด Path ของไฟล์ JSON
  private readonly CoursePath = join(process.cwd(),"course.json")
  private readonly StudentPath = join(process.cwd(),"student.json")
  //private readonly studentPath = path.resolve(__dirname, '../student.json');
  //private readonly coursePath = path.resolve(__dirname, '../course.json');

  // แก้จาก any[] เป็นประเภทที่ระบุชัดเจน (ใช้ T เพื่อให้รับได้ทั้ง Student[] และ Course[])
  private readJsonFile<T>(filePath: string): T[] {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T[];
  }

  // แก้จาก any[] เป็น Student[]
  private writeJsonFile(filePath: string, data: Student[]): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  // ตรวจสอบวิชากับ course.json
  private validateEnrollments(enrollments: EnrollmentDto[]) {
    // ระบุว่าเป็นประเภท any หรือสร้าง interface Course มารองรับก็ได้
    const courses = this.readJsonFile<any>(this.CoursePath);
    for (const item of enrollments) {
      const courseExists = courses.find(c => c.courseId === item.courseId);
      if (!courseExists) {
        throw new BadRequestException(`ไม่พบวิชา ${item.courseId} ในระบบ`);
      }
    }
  }

  findAll(): Student[] {
    return this.readJsonFile<Student>(this.StudentPath);
  }

  findOne(id: string): Student {
    const students = this.readJsonFile<Student>(this.StudentPath);
    const student = students.find(s => s.id === id);
    if (!student) throw new NotFoundException(`ไม่พบนักเรียนไอดี ${id}`);
    return student;
  }

  create(createStudentDto: CreateStudentDto): Student {
    const students = this.readJsonFile<Student>(this.StudentPath);

    // เช็ค ID ซ้ำ
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

  update(id: string, updateStudentDto: UpdateStudentDto): Student {
    let students = this.readJsonFile<Student>(this.StudentPath);
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

  remove(id: string) {
    let students = this.readJsonFile<Student>(this.StudentPath);
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