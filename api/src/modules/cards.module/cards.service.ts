import { HttpException, Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ICardsService } from "src/common/interfaces/services/cards.service.interface"
import { Card } from "./entities/card.entity"
import { CardType } from "../card-types.module/entities/card-type.entity"
import { Equal, Like, Not, Repository } from "typeorm"
import { ICard } from "src/common/interfaces/types/card.interface"
import { ICardColor } from "src/common/interfaces/types/color.interface"
import { ICardType } from "src/common/interfaces/types/card-type.type"
import { PARSER_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IParser } from "src/common/interfaces/parser.interface"
import { IFilter } from "src/common/interfaces/filter.interface"
import { CardCreateDto } from "src/common/dto/card-create.dto"
import { CardColor } from "../card-colors.module/entities/card-color.entity"


@Injectable()
export class CardsService implements ICardsService {
    constructor(
        @InjectRepository(Card) private readonly _cardRepository: Repository<ICard>,
        @InjectRepository(CardColor) private readonly _cardColorRepository: Repository<ICardColor>,
        @InjectRepository(CardType) private readonly _cardTypeRepository: Repository<ICardType>,
        @Inject(PARSER_TOKEN) private readonly _parser: IParser
    ) { }

    async parseData(): Promise<ICard[]> {
        return this._parser.parseCards(await (await fetch("http://kontinuum.su:3000/images/Ascent.xml")).text())
    }

    async findAll(filter: IFilter): Promise<ICard[]> {
        try {

            let color = null
            let type = null
            if (filter.color) {
                color = await this._cardColorRepository.findOne({ where: { name: Like(`%${filter.color}%`) } })
                console.log(color)
            }
            if (filter.type) {
                type = await this._cardTypeRepository.findOne({ where: { name: Like(`%${filter.type}%`) } })
            }

            const [result, count] = await this._cardRepository.findAndCount({
                order: { name: "ASC" },
                where: {
                    name: filter.name ? Like(`%${filter.name}%`) : Like("%%"),
                    pt: filter.pt ? Equal(filter.pt) : Not(999999),
                    manacost: filter.manacost ? Equal(filter.manacost) : Not(999999),
                    color: { name: filter.color },
                    maintype: { name: filter.type }
                },

            })
            return result
        }
        catch (error) {
            throw new HttpException(error, 400)
        }
    }

    async save(card: CardCreateDto): Promise<Card> {
        try {
            return await this._cardRepository.save(card)
        }
        catch (error) {
            throw new HttpException(error, 400)
        }
    }
}