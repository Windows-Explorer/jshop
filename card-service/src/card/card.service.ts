import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { PARSER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { CardCreateDto } from "src/common/dto/card-create.dto"
import { ICard } from "src/common/interfaces/card.interface"
import { ICardService } from "src/common/interfaces/card.service.interface"
import { IParser } from "src/common/interfaces/parser.interface"
import { Repository } from "typeorm"
import { Card } from "./entities/card.entity"

@Injectable()
export class CardService implements ICardService {
    constructor(
        @InjectRepository(Card) private readonly _cardRepository: Repository<Card>,
        @Inject(PARSER_TOKEN) private readonly _parser: IParser
    ) {}

    async parseData(): Promise<any[]> {
        return this._parser.parseCards(await (await fetch("http://kontinuum.su:3000/images/Ascent.xml")).text())
    }
    async pushParsedData(): Promise<Card[]> {
        throw new Error("Method not implemented.")
    }

    async findAll(): Promise<Card[]> {
        return await this._cardRepository.find()
    }

    async save(card: CardCreateDto): Promise<Card> {
        return await this._cardRepository.save(card)
    }
}