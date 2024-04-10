import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AccessTokenDto, RefreshTokenDto } from './dto'
import { accessTokenConfig, refreshTokenConfig } from './config'


@Injectable()
export class SessionService {

    constructor (
        private jwtService: JwtService
    ) {}

    async getAccessToken(dto: AccessTokenDto) {
        const accessToken = await this.jwtService.signAsync(dto, accessTokenConfig.jwtSign)
        
        return accessToken
    }

    async getRefreshToken(dto: RefreshTokenDto) {
        const refreshToken = await this.jwtService.signAsync(dto, refreshTokenConfig.jwtSign)
        
        return refreshToken
    }

    async verifyToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token)
        } catch(e) { 
            console.log(e)
            
            return false
        }
    }
    
}
