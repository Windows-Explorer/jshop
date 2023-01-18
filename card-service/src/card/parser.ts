import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common"
import { IParser } from "src/common/interfaces/parser.interface"
import { Card } from "./entities/card.entity"
import { Color } from "./entities/color.entity"
import { CardType } from "./entities/type.entity"
import * as xmlParser from "fsp-xml-parser"
import { ICard } from "src/common/interfaces/card.interface"
import { IColor } from "src/common/interfaces/color.interface"
import { ICardType } from "src/common/interfaces/type.interface"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { LOGGER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { ILogger } from "src/common/interfaces/logger.interface"

@Injectable()
export class Parser implements IParser {
    constructor(
        @InjectRepository(Color) private readonly _colorRepository: Repository<IColor>,
        @InjectRepository(CardType) private readonly _typeRepository: Repository<ICardType>,
        @InjectRepository(Card) private readonly _cardRepository: Repository<ICard>,
        @Inject(LOGGER_TOKEN) private readonly _logger: ILogger
    ) {}

    async parseColors(xml: string): Promise<IColor[]> {
        try {
            this._logger.log("Starting parsing colors...")

            await this._colorRepository.delete({})
            this._logger.log("Colors table is cleared")

            await this._colorRepository.query("ALTER TABLE color AUTO_INCREMENT = 1")
            this._logger.log("Colors table reset auto_increment")

            const colors: IColor[] = []
            const colorNames: string[] = []
            xmlParser.parse(xml).root.children[1].children.forEach(card => {
                const colorName: string = String(card.children[2].children[4].content)
                if(!colorNames.includes(colorName)) {
                    colorNames.push(colorName)
                }
            })
            colorNames.forEach(colorName => colors.push(new Color(colorName)))

            this._logger.log("Successfull colors parsing")

            return await this._colorRepository.save(colors)

        } catch (err) {
            this._logger.error(err)
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async parseTypes(xml: string): Promise<ICardType[]> {
        try {
            this._logger.log("Starting parsing types...")

            await this._typeRepository.delete({})
            this._logger.log("Types table is cleared")

            await this._typeRepository.query("ALTER TABLE card_type AUTO_INCREMENT = 1")
            this._logger.log("Types table reset auto_increment")

            const types: ICardType[] = []
            const typeNames: string[] = []
            xmlParser.parse(xml).root.children[1].children.forEach( card => {
                const typeName: string = String(card.children[2].children[2].content)
                if(!typeNames.includes(typeName)) {
                    typeNames.push(typeName)
                }
            })
            typeNames.forEach(typeName => types.push(new CardType(typeName)))

            this._logger.log("Successfull types parsing")

            return await this._typeRepository.save(types)

        } catch (err) {
            this._logger.error(err)
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async parseCards(xml: string): Promise<ICard[]> {
        try {
            this._logger.log("Starting parsing cards...")

            await this._cardRepository.delete({})
            this._logger.log("Types table is cleared")

            await this._cardRepository.query("ALTER TABLE card AUTO_INCREMENT = 1")
            this._logger.log("Types table reset auto_increment")
            
            const colors: IColor[] = await this.parseColors(xml)
            const types: ICardType[] = await this.parseTypes(xml)

            const cards: ICard[] = []
            const xmlCardsNode: xmlParser.XmlNode[] = xmlParser.parse(xml).root.children[1].children

            xmlCardsNode.forEach( el => {
                const name: string = String(el.children[0].content)
                const text: string = String(el.children[1].content)
                const manacost: number = Number(el.children[2].children[0].content) || 0
                const pt: number = Number(el.children[2].children[1].content) || 0
                const maintype: ICardType = types.find(() => new CardType(String(el.children[2].children[2].content)))
                const type: ICardType = types.find(() => new CardType(String(el.children[2].children[3].content)))
                const color: IColor = colors.find(() => new Color(String(el.children[2].children[4].content)))
                const image: string = String(el.children[4].attributes.picURL)
                cards.push(new Card(name, text, manacost, pt, maintype, type, color, image))
            })

            this._logger.log("Successfull cards parsing")

            this._logger.log("Starting pushing into database...")
            return await this._cardRepository.save(cards)
            
        } catch (err) {
            this._logger.error(err)
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}