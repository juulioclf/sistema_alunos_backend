import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {

  @ApiProperty({
    description: 'The email of the user',
    example: 'example@example.com', 
  })
  @IsEmail()
  email: string;


  @ApiProperty({
    description: 'The password of the user',
    example: 'yourPassword123',
  })
  @IsString()
  password: string;
}