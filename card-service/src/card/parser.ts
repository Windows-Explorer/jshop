import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
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

@Injectable()
export class Parser implements IParser {
    constructor(
        @InjectRepository(Color) private readonly _colorRepository: Repository<IColor>,
        @InjectRepository(CardType) private readonly _typeRepository: Repository<ICardType>,
        @InjectRepository(Card) private readonly _cardRepository: Repository<ICard>
    ) {}

    async parseColors(xml: string): Promise<IColor[]> {
        try {
            await this._colorRepository.delete({})
            
            const colors: IColor[] = []
            const colorNames: string[] = []
            xmlParser.parse(xml).root.children[1].children.forEach(card => {
                const colorName: string = String(card.children[2].children[4].content)
                if(!colorNames.includes(colorName)) {
                    colorNames.push(colorName)
                }
            })
            colorNames.forEach(colorName => colors.push(new Color(colorName)))

            return await this._colorRepository.save(colors)

        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async parseTypes(xml: string): Promise<ICardType[]> {
        try {
            await this._typeRepository.delete({})

            const types: ICardType[] = []
            const typeNames: string[] = []
            xmlParser.parse(xml).root.children[1].children.forEach( card => {
                const typeName: string = String(card.children[2].children[2].content)
                if(!typeNames.includes(typeName)) {
                    typeNames.push(typeName)
                }
            })
            typeNames.forEach(typeName => types.push(new CardType(typeName)))
            
            return await this._typeRepository.save(types)

        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async parseCards(xml: string): Promise<ICard[]> {
        try {
            await this._cardRepository.delete({})

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
            return await this._cardRepository.save(cards)
            
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}