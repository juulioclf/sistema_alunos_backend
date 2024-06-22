import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {

    const data = {...createStudentDto}

    const isRegistredEmail = await this.prisma.student.findUnique({
      where: {email: data.email}
    });

    const isRegistredRegistration = await this.prisma.student.findUnique({
      where: {registration: data.registration}
    });

    if (isRegistredEmail) {
      throw new ConflictException("Email already in use")
    }else if(isRegistredRegistration){
      throw new ConflictException("Registration already in use")
    }

    const createdStudent = await this.prisma.student.create({data});
    
    return {
      ...createdStudent
}

  }

  async findAll() {

    const allStudents = await this.prisma.student.findMany();

    return {...allStudents}
  }

  async findOne(id: number) {

    const student = await this.prisma.student.findUnique({
      where: {id: id}
    });

    return {... student}
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {

    const updatedStudent = await this.prisma.student.update({
      where: { id: id},
      data: updateStudentDto
    });

    return updatedStudent
  }

  async remove(id: number) {

    const deletedStudent = await this.prisma.student.delete({
      where: {id: id}
    });

    return {...deletedStudent}
  }
}
