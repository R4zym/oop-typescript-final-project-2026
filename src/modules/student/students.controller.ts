import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { Student, StudentService } from './students.service';
import { CreateStudentDto, UpdateAllStudentDto, UpdateStudentDto } from './dto/student.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/interface/ApiResponse.Interfaces';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async getAll(): Promise<ApiResponse<Student[]>> {
    const getData = await this.studentService.findAll();
    return {
      success: true,
      message: "successfully get all students",
      data: getData,
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  async getOne(@Param('id') id: string): Promise<ApiResponse<Student>> {
    const getOneData = await this.studentService.findOne(id);
    return {
      success: true,
      message: "successfully get student",
      data: getOneData,
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  async create(@Body() createDto: CreateStudentDto): Promise<ApiResponse<Student>> {
    const newStudent = await this.studentService.create(createDto);
    return {
      success: true,
      message: "successfully created student",
      data: newStudent,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a student by ID' })
  async updateAll(@Param('id') id: string, @Body() updateAllDto: UpdateAllStudentDto): Promise<ApiResponse<Student>> {
    const updatedAllStudent = await this.studentService.updateAll(id, updateAllDto);
    return {
      success: true,
      message: `successfully updated student ${id}`,
      data: updatedAllStudent,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a student by ID' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateStudentDto): Promise<ApiResponse<Student>> {
    const updatedStudent = await this.studentService.update(id, updateDto);
    return {
      success: true,
      message: `successfully updated student ${id}`,
      data: updatedStudent,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student by ID' })
  async delete(@Param('id') id: string): Promise<ApiResponse<null>> {
    const delData = await this.studentService.remove(id);
    return {
      success: true,
      message: `successfully deleted student ${id}`,
      data: delData,
    };
  }
}