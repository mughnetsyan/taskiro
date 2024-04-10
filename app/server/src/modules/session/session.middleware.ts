import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { SessionService } from './session.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    private readonly sessionService: SessionService
  ) {}

  async use(request: Request, next: NextFunction) {
    const { accessToken } = request.cookies

    if(!accessToken) {
      throw new UnauthorizedException()
    }

    const decodedAccessToken = await this.sessionService.verifyToken(accessToken)
    const isAccessTokenValid = Boolean(decodedAccessToken)

    if(!isAccessTokenValid) {
      throw new UnauthorizedException()
    }

    next();
  }
}
