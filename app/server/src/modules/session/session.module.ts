import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from 'modules/user';

import { SessionService } from './session.service';
import { SessionController } from './session.controller';



@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [
    UserModule
  ],
  exports: [
    SessionService
  ]
})
export class SessionModule {}
