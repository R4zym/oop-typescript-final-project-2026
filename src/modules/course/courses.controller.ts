import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService, Course } from './courses.service'; // เพิ่ม Course เข้ามาใน import
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Course { // ระบุ type ให้ชัดเจน
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll(): Course[] { // ระบุ type ให้ชัดเจน
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Course {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Course {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}