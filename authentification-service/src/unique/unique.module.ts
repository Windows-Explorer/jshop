import { Module } from "@nestjs/common"
import { OUTPUT_TOKEN, UNIQUE_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { Output } from "src/common/output"
import { UsersModule } from "src/users/users.module"
import { UniqueController } from "./unique.controller"
import { UniqueService } from "./unique.service"

@Module({
    controllers: [UniqueController],
    imports: [UsersModule],
    providers: [
        { provide: OUTPUT_TOKEN, useClass: Output },
        { provide: UNIQUE_SERVICE_TOKEN, useClass: UniqueService }
    ]
})
export class UniqueModule { }
