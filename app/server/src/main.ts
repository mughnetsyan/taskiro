import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppModule } from 'app/app.module'


async function bootstrap() {
  const PORT = process.env.PORT

  const app = await NestFactory.create(AppModule)
  
  app.enableCors({
    credentials: true,
    origin: true
  })

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  
  await app.listen(PORT)
}


bootstrap()
