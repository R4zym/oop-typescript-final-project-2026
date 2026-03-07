import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CourseStatus, CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';

@Injectable()
export class CourseService {
  // เปลี่ยนไปใช้ไฟล์ courses.json
  private readonly CoursePath = join(process.cwd(),"course.json")

  private readData(): Course[] {
    try {
      // ตรวจสอบว่าไฟล์มีอยู่จริงไหม
      if (!fs.existsSync(this.CoursePath)) {
        fs.writeFileSync(this.CoursePath, '[]', 'utf-8'); // สร้างไฟล์ใหม่ถ้าไม่มี
        return [];
      }

      const jsonData = fs.readFileSync(this.CoursePath, 'utf-8');
      
      // ตรวจสอบว่าไฟล์ว่างเปล่าหรือไม่ (สาเหตุของ Error Unexpected end of JSON)
      if (!jsonData || jsonData.trim() === "") {
        return [];
      }

      return JSON.parse(jsonData);
    } catch (error) {
      console.error("Error reading JSON:", error);
      return []; // คืนค่าอาเรย์ว่างถ้าเกิดปัญหา
    }
  }

  private writeData(data: Course[]): void {
    fs.writeFileSync(this.CoursePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // FIND ALL: ดึงวิชาทั้งหมดจาก courses.json
  findAll(): Course[] {
    return this.readData();
  }

  // FIND ONE: ค้นหาตาม courseId
  findOne(courseId: string): Course {
    const courses = this.readData();
    const course = courses.find(c => c.courseId === courseId);
    if (!course) throw new NotFoundException(`ไม่พบวิชารหัส ${courseId}`);
    return course;
  }

  // CREATE: เพิ่มวิชาใหม่ลงใน courses.json
  create(createCourseDto: CreateCourseDto): Course {
    const courses = this.readData();
    
    // ตรวจสอบว่ามีรหัสวิชานี้อยู่แล้วหรือไม่
    const existing = courses.find(c => c.courseId === createCourseDto.courseId);
    if (existing) throw new BadRequestException('รหัสวิชานี้มีอยู่ในระบบแล้ว');

    const newCourse = {
      ...createCourseDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    courses.push(newCourse);
    this.writeData(courses);
    return newCourse;
  }

  // UPDATE: แก้ไขข้อมูลวิชาใน courses.json
  update(courseId: string, updateCourseDto: UpdateCourseDto): Course {
    const courses = this.readData();
    const index = courses.findIndex(c => c.courseId === courseId);

    if (index === -1) throw new NotFoundException(`ไม่พบวิชารหัส ${courseId}`);

    courses[index] = {
      ...courses[index],
      ...updateCourseDto,
      updatedAt: new Date().toISOString(),
    };

    this.writeData(courses);
    return courses[index];
  }

  // DELETE: ลบวิชาออกจาก courses.json
  remove(courseId: string) {
    const courses = this.readData();
    const filtered = courses.filter(c => c.courseId !== courseId);
    
    if (courses.length === filtered.length) {
      throw new NotFoundException(`ไม่พบวิชารหัส ${courseId}`);
    }

    this.writeData(filtered);
    return { message: `ลบวิชา ${courseId} สำเร็จ` };
  }
}

export interface Course {
  createdAt: string;
  updatedAt: string;
  courseId: string;
  courseName: string;
  credits: number;
  category: string;
  status?: CourseStatus | undefined;
}