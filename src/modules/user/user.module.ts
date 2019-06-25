import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserEntity } from 'src/shared/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
})
export class UserModule {}
