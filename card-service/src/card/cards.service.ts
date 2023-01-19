import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LOGGER_TOKEN, PARSER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { CardCreateDto } from "src/common/dto/card-create.dto"
import { ICard } from "src/common/interfaces/card.interface"
import { ICardsService } from "src/common/interfaces/cards.service.interface"
import { ILogger } from "src/common/interfaces/logger.interface"
import { IParser } from "src/common/interfaces/parser.interface"
import { Repository } from "typeorm"
import { Card } from "./entities/card.entity"

@Injectable()
export class CardsService implements ICardsService {
    constructor(
        @InjectRepository(Card) private readonly _cardRepository: Repository<Card>,
        @Inject(PARSER_TOKEN) private readonly _parser: IParser,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILogger
    ) {}

    async parseData(): Promise<ICard[]> {
        this._logger.log("Starting parsing data...")
        return this._parser.parseCards(await (await fetch("http://kontinuum.su:3000/images/Ascent.xml")).text())
    }

    async findAll(): Promise<Card[]> {
        return await this._cardRepository.find()
    }

    async save(card: CardCreateDto): Promise<Card> {
        return await this._cardRepository.save(card)
    }
}