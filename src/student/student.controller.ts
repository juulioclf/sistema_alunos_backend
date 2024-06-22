import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger'; // Importar os decorators do Swagger
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('students')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: CreateStudentDto })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: 'Get all students' })
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiBody({ type: UpdateStudentDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Delete a student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
