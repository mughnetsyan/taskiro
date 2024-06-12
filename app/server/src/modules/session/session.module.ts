import { Module } from '@nestjs/common';

import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserModule } from 'modules/user/user.module';

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
