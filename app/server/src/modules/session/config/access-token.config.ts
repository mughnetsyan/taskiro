import ms from "ms"
import { type CookieOptions } from "express"
import { type JwtSignOptions } from "@nestjs/jwt"


const maxAge = '15min'


const accessTokenCookieConfig: CookieOptions =  {
    httpOnly: true,
    maxAge: ms(maxAge)
}

const accessTokenSignConfig: JwtSignOptions = {
    expiresIn: maxAge
}


export const accessTokenConfig = {
    cookie: accessTokenCookieConfig,
    jwtSign: accessTokenSignConfig
}