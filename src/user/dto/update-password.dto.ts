import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
  } from 'class-validator';
  
  export class UpdatePasswordDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'password too weak',
    })
    newPassword: string;
  
    @IsString()
    currentPassword: string;
  }
  