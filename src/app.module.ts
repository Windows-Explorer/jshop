import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { User } from './users/entities/user.entity'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "172.30.47.151",
      port: 3306,
      username: "server",
      password: "Q1qqqqqq",
      database: "jshop",
      entities: [User],
      synchronize: true,
    })
  ],
  controllers: [AppController]
})

export class AppModule {}
