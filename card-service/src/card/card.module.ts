import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CARD_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { CardController } from "./card.controller"
import { CardService } from "./card.service"
import { Card } from "./entities/card.entity"
import { Color } from "./entities/color.entity"

@Module({
    imports: [
        TypeOrmModule.forFeature([ Color, Card ])
    ],
    controllers: [ CardController ],
    providers: [
        {
            provide: CARD_SERVICE_TOKEN,
            useClass: CardService
        }
    ]
})

export class CardModule {}