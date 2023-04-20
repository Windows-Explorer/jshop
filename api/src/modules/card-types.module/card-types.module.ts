import { Module } from "@nestjs/common"
import { CARD_TYPES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { CardTypesController } from "./card-types.controller"
import { CardTypesService } from "./card-types.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CardType } from "./entities/card-type.entity"
import { AuthModule } from "../auth.module/auth.module"

@Module({
    imports: [
        TypeOrmModule.forFeature([CardType]),
        AuthModule
    ],
    providers: [
        { provide: CARD_TYPES_SERVICE_TOKEN, useClass: CardTypesService }
    ],
    controllers: [CardTypesController]
})
export class CardTypesModule { }
