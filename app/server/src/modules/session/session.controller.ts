import { Controller, Req, Res, Body, Post, Get, UnauthorizedException, BadRequestException, NotFoundException, ConflictException, HttpCode, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { UserService } from 'modules/user';

import { SessionService } from './session.service';
import { SignInDto, SignUpDto } from './dto';
import { Session } from './types';


@Controller('session')
export class SessionController {
    constructor(
      private readonly sessionService: SessionService,
      private readonly userService: UserService,
      private readonly configService: ConfigService
    ) {}
	
	@Get()
  @HttpCode(200)
  async obtainSession(@Req() request: Request): Promise<Session> {
    const { accessToken } = request.cookies

    const decodedAccessToken = await this.sessionService.verifyToken(accessToken)

    const { userId } = decodedAccessToken

    const user = await this.userService.findUserById(userId)

    const session = {
      login: user.login,
    }

    return session
  }

  @Get('refresh')
  @HttpCode(200)  
  async refreshSession(@Req() request: Request, @Res({passthrough: true}) response: Response) {
    const { refreshToken } = request.cookies


    if(!refreshToken) {
      throw new UnauthorizedException()
    }

    const decodedRefreshToken = await this.sessionService.verifyToken(refreshToken)


    const isRefreshTokenValid = Boolean(decodedRefreshToken)
    if(!isRefreshTokenValid) {
      throw new UnauthorizedException()
    }


    const { userId } = decodedRefreshToken


    const newAccessToken = await this.sessionService.getAccessToken({userId})
    const newRefreshToken = await this.sessionService.getRefreshToken({userId})

    response.cookie('accessToken', newAccessToken, {
      httpOnly: true,
    })
    response.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
    })
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto, @Res({passthrough: true}) response: Response) {
    const { login, password } = body


    if(!login || !password) {
      throw new BadRequestException()
    }


    const user = await this.userService.findUserByLogin(login)


    if(!user) {
      throw new NotFoundException()
    }

    const passwordsEqual = await bcrypt.compare(password, user.password)
    if(!passwordsEqual) {
      throw new UnauthorizedException()
    }
    

    const { id: userId } = user


    const newAccessToken = await this.sessionService.getAccessToken({userId})
    const newRefreshToken = await this.sessionService.getRefreshToken({userId})

    response.cookie('accessToken', newAccessToken, {
      httpOnly: true,
    })
    response.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
    })
  }

  @Post('sign-up')
  @HttpCode(201)
  async signUp(@Body() body: SignUpDto, @Res({passthrough: true}) response: Response) {
    const { login, password } = body


    if(!login || !password) {
      throw new BadRequestException()
    }

    
    const userExists = Boolean(await this.userService.findUserByLogin(login))
    if(userExists) {
      throw new ConflictException()
    }


    const salt = parseInt(this.configService.get<string>('BCRYPT_SALT'))
    const cryptedPassword = await bcrypt.hash(password, salt)

    const user = await this.userService.createUser({ login, password: cryptedPassword })
    const { id: userId } = user


    const newAccessToken = await this.sessionService.getAccessToken({userId})
    const newRefreshToken = await this.sessionService.getRefreshToken({userId})

    response.cookie('accessToken', newAccessToken, {
      httpOnly: true,
    })
    response.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
    })
  }
}
