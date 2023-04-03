import { Module } from "@nestjs/common"
import { CardController } from "./card.controller"
import { CardProtectedController } from "./card.protected.controller"
import { CARDS_SERVICE_TOKEN, PARSER_TOKEN } from "src/common/constants/inject-tokens.constants"
import { CardsService } from "./cards.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Card } from "./entities/card.entity"
import { ConfigModule } from "@nestjs/config"
import { CardColor } from "../card-colors.module/entities/card-color.entity"
import { CardType } from "../card-types.module/entities/card-type.entity"
import { Parser } from "src/common/parser"
import { AuthModule } from "../auth.module/auth.module"

@Module({
    imports: [
        TypeOrmModule.forFeature([Card, CardColor, CardType]),
        ConfigModule,
        AuthModule
    ],
    controllers: [CardController, CardProtectedController],
    providers: [
        { provide: CARDS_SERVICE_TOKEN, useClass: CardsService },
        { provide: PARSER_TOKEN, useClass: Parser}
    ]
})
export class CardModule { }