import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { User } from './users/entities/user.entity'
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "jshop",
      entities: [User],
      synchronize: true
    })
  ],
  controllers: [AppController]
})

export class AppModule {}
