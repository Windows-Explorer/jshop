import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { USERS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { User } from "./entities/user.entity"
import { UsersService } from "./users.service"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule
  ],
  providers: [
    { provide: USERS_SERVICE_TOKEN, useClass: UsersService }
  ],
  controllers: [],
  exports: [USERS_SERVICE_TOKEN]
})

export class UsersModule { }
