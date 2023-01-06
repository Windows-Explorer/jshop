import { Module } from "@nestjs/common"
import { RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { Resulter } from "src/common/resulter"
import { UsersModule } from "src/users/users.module"
import { UniqueController } from "./unique.controller"

@Module({
    controllers: [ UniqueController ],
    imports: [ UsersModule ],
    providers: [
        { provide: RESULTER_TOKEN, useClass: Resulter }
    ]
})
export class UniqueModule {}
