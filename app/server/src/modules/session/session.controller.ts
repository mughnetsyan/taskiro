import { Controller, Req, Res, Body, Post, Get, UnauthorizedException, BadRequestException, NotFoundException, ConflictException, HttpCode, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type Request, type Response } from 'express';
import * as bcrypt from 'bcrypt';

import { UserService } from 'modules/user';

import { SessionService } from './session.service';
import { SignInDto, SignUpDto } from './dto';
import { Session } from './types';
import { accessTokenConfig, refreshTokenConfig } from './config';


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
      name: user.name,
      bio: user.bio
    }

    return session
  }

  @Post('refresh')
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

    response.cookie('accessToken', newAccessToken, accessTokenConfig.cookie)
    response.cookie('refreshToken', newRefreshToken, refreshTokenConfig.cookie)
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto, @Res({passthrough: true}) response: Response) {
    const login = body.login.toLowerCase()
    const password = body.password


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


    const userId = user.id


    const newAccessToken = await this.sessionService.getAccessToken({userId})
    const newRefreshToken = await this.sessionService.getRefreshToken({userId})


    response.cookie('accessToken', newAccessToken, accessTokenConfig.cookie)
    response.cookie('refreshToken', newRefreshToken, refreshTokenConfig.cookie)
  }

  @Post('sign-up')
  @HttpCode(201)
  async signUp(@Body() body: SignUpDto, @Res({passthrough: true}) response: Response) {
    const login = body.login.toLowerCase()
    const password = body.password


    if(!login || !password) {
      throw new BadRequestException()
    }

    
    const userExists = Boolean(await this.userService.findUserByLogin(login))
    if(userExists) {
      throw new ConflictException()
    }


    const salt = parseInt(this.configService.get<string>('BCRYPT_SALT'))
    const cryptedPassword = await bcrypt.hash(password, salt)

    const user = await this.userService.createUser({ ...body, login, password: cryptedPassword })
    const { id: userId } = user


    const newAccessToken = await this.sessionService.getAccessToken({userId})
    const newRefreshToken = await this.sessionService.getRefreshToken({userId})

    response.cookie('accessToken', newAccessToken, accessTokenConfig.cookie)
    response.cookie('refreshToken', newRefreshToken, refreshTokenConfig.cookie)
  }
}
