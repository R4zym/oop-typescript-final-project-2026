import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService, Course } from './courses.service'; // เพิ่ม Course เข้ามาใน import
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/interface/ApiResponse.Interfaces';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  async findAll(): Promise<ApiResponse<Course[]>> {
    const getData = await this.courseService.findAll();
    return {
      success: true,
      message: "successfully get all courses",
      data: getData,
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course by ID' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<Course>> {
    const getOneData = await this.courseService.findOne(id);
    return {
      success: true,
      message: "successfully get course",
      data: getOneData,
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  async create(@Body() createCourseDto: CreateCourseDto): Promise<ApiResponse<Course>> {
    const newCourse = await this.courseService.create(createCourseDto);
    return {
      success: true,
      message: "successfully created course",
      data: newCourse,
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a course by ID' })
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<ApiResponse<Course>> {
    const updatedCourse = await this.courseService.update(id, updateCourseDto);
    return {
      success: true,
      message: "successfully updated course",
      data: updatedCourse,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course by ID' })
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    const delData = await this.courseService.remove(id);
    return {
      success: true,
      message: "successfully deleted course",
      data: null,
    };
  }
}