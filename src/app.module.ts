import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/students.module';
import { CourseController } from './modules/course/courses.controller';
import { CourseService } from './modules/course/courses.service';

@Module({
  imports: [StudentModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class AppModule {}
