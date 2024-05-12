import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtModule } from '@nestjs/jwt'

import { User, UserModule } from 'modules/user'
import { Project, ProjectModule } from 'modules/project'
import { SessionMiddleware, SessionModule } from 'modules/session'
import { Task, TaskModule } from 'modules/task'



@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, Project, Task],
      autoLoadModels: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    }),


    UserModule,
    ProjectModule,
    SessionModule,
    TaskModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .exclude(
        'session/refresh',
        'session/sign-in',
        'session/sign-up'
      )
      .forRoutes('*')
  }
}
