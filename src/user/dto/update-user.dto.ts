import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotPassword } from '../../auth/middleware/update-validation.middleware';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotPassword({ message: 'Password cannot be updated through this route' })
  password?: string;
}
