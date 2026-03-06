import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/students.module';
import { CourseModule } from './modules/course/courses.module';

@Module({
  imports: [StudentModule, CourseModule],
  controllers: [CourseModule],
  providers: [StudentModule],
})
export class AppModule {}
