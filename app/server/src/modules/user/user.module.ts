import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './user.model';

import { UserService } from './user.service';
import { UserController } from './user.controller';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User])
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
