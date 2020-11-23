import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
