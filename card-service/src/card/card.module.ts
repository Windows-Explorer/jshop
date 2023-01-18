import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CARD_SERVICE_TOKEN, LOGGER_TOKEN, PARSER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { Logger } from "src/common/logger"
import { CardController } from "./card.controller"
import { CardService } from "./card.service"
import { Card } from "./entities/card.entity"
import { Color } from "./entities/color.entity"
import { CardType } from "./entities/type.entity"
import { Parser } from "./parser"

@Module({
    imports: [
        TypeOrmModule.forFeature([ Color, Card, CardType ])
    ],
    controllers: [ CardController ],
    providers: [
        { provide: CARD_SERVICE_TOKEN, useClass: CardService },
        { provide: PARSER_TOKEN, useClass: Parser },
        { provide: LOGGER_TOKEN, useClass: Logger }
    ]
})

export class CardModule {}