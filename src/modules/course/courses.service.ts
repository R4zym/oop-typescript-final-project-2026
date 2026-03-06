import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CourseService {
  // เปลี่ยนไปใช้ไฟล์ courses.json
  private readonly filePath = path.resolve(process.cwd(), 'src/data/courses.json');

  private readData(): any[] {
    const jsonData = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(jsonData);
  }

  private writeData(data: any[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // FIND ALL: ดึงวิชาทั้งหมดจาก courses.json
  findAll() {
    return this.readData();
  }

  // FIND ONE: ค้นหาตาม courseId
  findOne(courseId: string) {
    const courses = this.readData();
    const course = courses.find(c => c.courseId === courseId);
    if (!course) throw new NotFoundException(`ไม่พบวิชารหัส ${courseId}`);
    return course;
  }

  // CREATE: เพิ่มวิชาใหม่ลงใน courses.json
  create(createCourseDto: CreateCourseDto) {
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
  update(courseId: string, updateCourseDto: UpdateCourseDto) {
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