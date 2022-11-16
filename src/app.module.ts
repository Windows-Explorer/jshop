import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { User } from './users/entities/user.entity'
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "teh",
      entities: [User],
      synchronize: true,
    }),
    TokenModule
  ],
  controllers: [AppController]
})

export class AppModule {}
