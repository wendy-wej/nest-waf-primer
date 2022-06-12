import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createStudentDto: CreateStudentDto) {
    //return 'This action adds a new student';
    const newStudent = this.studentRepository.create(createStudentDto);
    //ideally, below should be wrapped in a transaction so that it can roll back if there is error in any of the stages.
    if (createStudentDto.user) {
      const newUser = this.userRepository.create(createStudentDto.user);
      const user: User = await this.userRepository.save(newUser);
      newStudent.user = user;
    }
    return this.studentRepository.save(newStudent)
  }

  async findAll() {
    //return `This action returns all students`;
    return await this.studentRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    //return `This action returns a #${id} student`;
    return await this.studentRepository.findOne({
      where: {
        id
      }});
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    //return `This action updates a #${id} student`;
    return await this.studentRepository.update(id, updateStudentDto);
  }

  async remove(id: number) {
    //return `This action removes a #${id} student`;
    return await this.studentRepository.delete(id);
  }

  /* Work on relationships */
  async setUserById(studentId: number, userId: number) {
    try {
      return await this.studentRepository.createQueryBuilder()
        .relation(Student, "user")
        .of(studentId)
        .set(userId)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem setting user for student: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unsetUserById(studentId: number) {
    try {
      return await this.studentRepository.createQueryBuilder()
        .relation(Student, "user")
        .of(studentId)
        .set(null)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem unsetting user for student: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}