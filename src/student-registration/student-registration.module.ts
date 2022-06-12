import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [UsersModule, StudentsModule]
})
export class StudentRegistrationModule {}
