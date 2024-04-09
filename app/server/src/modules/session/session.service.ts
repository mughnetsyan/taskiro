import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AccessTokenDto, RefreshTokenDto } from './dto'


@Injectable()
export class SessionService {

    constructor (
        private jwtService: JwtService
    ) {}

    async getAccessToken(dto: AccessTokenDto) {
        const accessToken = await this.jwtService.signAsync(dto, {
            expiresIn: '15min'
        })
        
        return accessToken
    }

    async getRefreshToken(dto: RefreshTokenDto) {
        const refreshToken = await this.jwtService.signAsync(dto, {
            expiresIn: '14d'
        })
        
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
