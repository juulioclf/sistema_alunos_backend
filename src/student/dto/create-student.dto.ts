import { IsEmail, IsString, Length, MinLength } from "class-validator";
import { Student } from "../entities/student.entity";

export class CreateStudentDto extends Student{
    @IsString()
    @Length(8,8)
    registration: string;


    @IsString()
    @MinLength(2)
    firstName: string;

    @IsString()
    @MinLength(2)
    lastName: string;

    @IsEmail()
    email: string;
}
