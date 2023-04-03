import { Module } from "@nestjs/common"
import { CARD_COLORS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { CardColorsService } from "./card-colors.service"
import { CardColorsController } from "./card-colors.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CardColor } from "./entities/card-color.entity"
import { AuthModule } from "../auth.module/auth.module"

@Module({
    imports: [
        TypeOrmModule.forFeature([CardColor]),
        AuthModule
    ],
    providers: [
        { provide: CARD_COLORS_SERVICE_TOKEN, useClass: CardColorsService }
    ],
    controllers: [CardColorsController]
})
export class CardColorsModule { }