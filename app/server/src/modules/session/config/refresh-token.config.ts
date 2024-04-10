import ms from "ms"
import { type CookieOptions } from "express"
import { type JwtSignOptions } from "@nestjs/jwt"


const maxAge = '14d'


const refreshTokenCookieConfig: CookieOptions =  {
    httpOnly: true,
    maxAge: ms(maxAge)
}

const refreshTokenSignConfig: JwtSignOptions = {
    expiresIn: maxAge
}


export const refreshTokenConfig = {
    cookie: refreshTokenCookieConfig,
    jwtSign: refreshTokenSignConfig
}