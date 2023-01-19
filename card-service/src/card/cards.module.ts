import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CARDS_SERVICE_TOKEN, COLORS_SERVICE_TOKEN, LOGGER_TOKEN, OUTPUT_TOKEN, PARSER_TOKEN, TYPES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { Logger } from "src/common/logger"
import { Resulter } from "src/common/resulter"
import { CardsController } from "./cards.controller"
import { CardsService } from "./cards.service"
import { ColorsController } from "./colors.controller"
import { ColorsService } from "./colors.service"
import { Card } from "./entities/card.entity"
import { Color } from "./entities/color.entity"
import { CardType } from "./entities/type.entity"
import { Parser } from "./parser"
import { TypesController } from "./types.controller"
import { TypesService } from "./types.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([ Color, Card, CardType ])
    ],
    controllers: [ CardsController, ColorsController, TypesController ],
    providers: [
        { provide: CARDS_SERVICE_TOKEN, useClass: CardsService },
        { provide: COLORS_SERVICE_TOKEN, useClass: ColorsService },
        { provide: TYPES_SERVICE_TOKEN, useClass: TypesService },
        { provide: PARSER_TOKEN, useClass: Parser },
        { provide: LOGGER_TOKEN, useClass: Logger },
        { provide: OUTPUT_TOKEN, useClass: Resulter }
    ]
})

export class CardsModule {}