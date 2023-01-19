import { customNotifies } from '@/store/notifies'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ICard } from './card-object.interface'
import { ICardType } from './card-type-object.interface'
import { IColor } from './color-object.interface'

@Module
export class CardsStoreModule extends VuexModule {
    cardsState: ICard[] = []
    cardTypesState: ICardType[] = []
    colorsState: IColor[] = []

    @Mutation
    cardMutation(cards: ICard[]): void {
        this.cardsState = cards
    }
    @Mutation
    cardTypeMutation(cardTypes: ICardType[]): void {
        this.cardTypesState = cardTypes
    }
    @Mutation
    colorMutation(colors: IColor[]): void {
        this.colorsState = colors
    }

    @Action({ commit: "cardMutatuion" })
    async getCards(): Promise<ICard[]> {
        const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/cards`)

        if (result.status === 200) {
            const cards: ICard[] = await result.json()
            customNotifies.positiveNotify()
            return cards
        }
        else {
            customNotifies.negativeNotify()
            return []
        }
    }

    @Action({ commit: "cardMutatuion" })
    async getColors(): Promise<IColor[]> {
        const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/cards/colors`)

        if (result.status === 200) {
            const colors: IColor[] = await result.json()
            customNotifies.positiveNotify()
            return colors
        }
        else {
            customNotifies.negativeNotify()
            return []
        }
    }
    @Action({ commit: "cardMutatuion" })
    async getCardTypes(): Promise<ICardType[]> {
        const result = await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/cards/types`)

        if (result.status === 200) {
            const cardTypes: ICardType[] = await result.json()
            customNotifies.positiveNotify()
            return cardTypes
        }
        else {
            customNotifies.negativeNotify()
            return []
        }
    }

    get cards(): ICard[] {
        return this.cardsState
    }

    get cardTypes(): ICardType[] {
        return this.cardTypesState
    }

    get cardColors(): IColor[] {
        return this.colorsState
    }

}