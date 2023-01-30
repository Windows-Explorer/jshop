import { HttpException, Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LOGGER_TOKEN, PARSER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { CardCreateDto } from "src/common/dto/card-create.dto"
import { IFilter } from "src/common/interfaces/filter.interface"
import { ICard } from "src/common/interfaces/card.interface"
import { ICardsService } from "src/common/interfaces/cards.service.interface"
import { ILogger } from "src/common/interfaces/logger.interface"
import { IParser } from "src/common/interfaces/parser.interface"
import { IResultAndCount } from "src/common/interfaces/result-and-count.interface"
import { Equal, Like, Not, Repository } from "typeorm"
import { Card } from "./entities/card.entity"
import { Color } from "./entities/color.entity"
import { IColor } from "src/common/interfaces/color.interface"
import { CardType } from "./entities/type.entity"
import { ICardType } from "src/common/interfaces/type.interface"

@Injectable()
export class CardsService implements ICardsService {
    constructor(
        @InjectRepository(Card) private readonly _cardRepository: Repository<ICard>,
        @InjectRepository(Color) private readonly _colorRepository: Repository<IColor>,
        @InjectRepository(CardType) private readonly _cardTypeRepository: Repository<ICardType>,
        @Inject(PARSER_TOKEN) private readonly _parser: IParser,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILogger
    ) {}

    async parseData(): Promise<ICard[]> {
        this._logger.log("Starting parsing data...")
        return this._parser.parseCards(await (await fetch("http://kontinuum.su:3000/images/Ascent.xml")).text())
    }

    async findAll(page: number, filter: IFilter): Promise<IResultAndCount<ICard[]>> {
        try {
            const take: number = 8
            const skip: number = ((page * take) < 0 ? 0: (page * take)) || 0

            let color = null
            let type = null
            if(filter.color) {
                color = await this._colorRepository.findOne({ where: { name: Like(`%${filter.color}%`) }})
                console.log(color)
            }
            if(filter.type) {
                type = await this._cardTypeRepository.findOne({ where: { name: Like(`%${filter.type}%`) }}) 
            }
            
            const [result, count] = await this._cardRepository.findAndCount({
                order: { name: "ASC" },
                take: take,
                skip: skip,
                where: {
                    name: filter.name ? Like(`%${filter.name}%`) : Like("%%"),
                    pt: filter.pt ? Equal(filter.pt) : Not(999999),
                    manacost: filter.manacost ? Equal(filter.manacost) : Not(999999),
                    color: { name: filter.color },
                    maintype: { name: filter.type }
                },
                
            })
            return { result: result, count: count / take }
        }
        catch(err) {
            throw new HttpException(err, 400)
        }
    }

    async save(card: CardCreateDto): Promise<Card> {
        return await this._cardRepository.save(card)
    }
}