import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { USERS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { User } from "./entities/user.entity"
import { UsersService } from "./users.service"

@Module({
  imports: [ TypeOrmModule.forFeature([ User ]) ],
  providers: [
    {
      provide: USERS_SERVICE_TOKEN,
      useClass: UsersService
    }
  ],
  controllers: [],
  exports: [ USERS_SERVICE_TOKEN ]
})

export class UsersModule {}
