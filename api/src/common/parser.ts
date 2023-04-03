import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { IParser } from "src/common/interfaces/parser.interface"
import * as xmlParser from "fsp-xml-parser"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CardColor } from "src/modules/card-colors.module/entities/card-color.entity"
import { CardType } from "src/modules/card-types.module/entities/card-type.entity"
import { Card } from "src/modules/cards.module/entities/card.entity"
import { ICardColor } from "./interfaces/types/color.interface"
import { ICardType } from "./interfaces/types/card-type.type"
import { ICard } from "./interfaces/types/card.interface"

@Injectable()
export class Parser implements IParser {
    constructor(
        @InjectRepository(CardColor) private readonly _colorsRepository: Repository<ICardColor>,
        @InjectRepository(CardType) private readonly _typesRepository: Repository<ICardType>,
        @InjectRepository(Card) private readonly _cardsRepository: Repository<ICard>,
    ) {}

    async parseColors(xml: string): Promise<ICardColor[]> {
        try {
            await this._colorsRepository.delete({})
            await this._colorsRepository.query("ALTER TABLE color AUTO_INCREMENT = 1")

            const colors: ICardColor[] = []
            const colorNames: string[] = []
            xmlParser.parse(xml).root.children[1].children.forEach(card => {
                const colorName: string = String(card.children[2].children[4].content)
                if(!colorNames.includes(colorName)) {
                    colorNames.push(colorName)
                }
            })
            colorNames.forEach(colorName => colors.push(new CardColor(colorName)))

            const result: ICardColor[] = await this._colorsRepository.save(colors)

            return result

        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async parseTypes(xml: string): Promise<ICardType[]> {
        try {
            await this._typesRepository.delete({})
            await this._typesRepository.query("ALTER TABLE card_type AUTO_INCREMENT = 1")
            const types: ICardType[] = []
            const typeNames: string[] = []
            xmlParser.parse(xml).root.children[1].children.forEach( card => {
                const typeName: string = String(card.children[2].children[2].content)
                if(!typeNames.includes(typeName)) {
                    typeNames.push(typeName)
                }
            })
            typeNames.forEach(typeName => types.push(new CardType(typeName)))

            const result: ICardType[] = await this._typesRepository.save(types)

            return result
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async parseCards(xml: string): Promise<ICard[]> {
        try {
            await this._cardsRepository.delete({})
            await this._cardsRepository.query("ALTER TABLE card AUTO_INCREMENT = 1")
            
            const colors: ICardColor[] = await this.parseColors(xml)
            const types: ICardType[] = await this.parseTypes(xml)

            const cards: ICard[] = []
            const xmlCardsNode: xmlParser.XmlNode[] = xmlParser.parse(xml).root.children[1].children

            xmlCardsNode.forEach( el => {
                const name: string = String(el.children[0].content)
                const text: string = String(el.children[1].content)
                const manacost: number = Number(el.children[2].children[0].content) || 0
                const pt: number = Number(el.children[2].children[1].content) || 0
                const maintype: ICardType = types.find((maintype: ICardType) => {
                    if(String(el.children[2].children[2].content) === maintype.name) return true
                    return false
                })
                const type: ICardType = types.find((type: ICardType) => {
                    if(String(el.children[2].children[3].content) === type.name) return true
                    return false
                })
                const color: ICardColor = colors.find((color: ICardColor) => {
                    if(String(el.children[2].children[4].content) === color.name) return true
                    return false
                })
                const image: string = String(el.children[4].attributes.picURL)
                cards.push(new Card(name, text, manacost, pt, maintype, type, color, image))
            })

            const result: ICard[] = await this._cardsRepository.save(cards)
            
            return result
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}