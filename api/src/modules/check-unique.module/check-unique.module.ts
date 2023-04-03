import { Module } from "@nestjs/common"
import { UniqueController } from "./check-unique.controller"
import { CheckUniqueService } from "./check-unique.service"
import { CHECK_UNIQUE_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { UsersModule } from "../users.module/users.module"
import { ConfigModule } from "@nestjs/config"

@Module({
    imports: [
        UsersModule,
        ConfigModule
    ],
    controllers: [UniqueController],
    exports: [],
    providers: [
        { provide: CHECK_UNIQUE_SERVICE_TOKEN, useClass: CheckUniqueService }
    ]
})

export class CheckUniqueModule { }