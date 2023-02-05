import { IValidator } from "../interfaces/validator.interface"

export class Validator implements IValidator {

    public async isRequired(value: string | number): Promise<string | boolean> {
        return !!value || false
    }

    public async isEmail(value: string): Promise<string | boolean> {
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailPattern.test(value) || false
    }

    public async isPhoneNumber(value: string): Promise<string | boolean> {
        const phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
        return phonePattern.test(value) || false 
    }

    public async isEmailUnique(value: string | number): Promise<string | boolean> {
        if(value === "") return true

        const result: string = await (await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/unique/email/${value}`)).json()
        if(value.toString().toLowerCase() !== result.toLowerCase()) return true

        return false
    }

    public async isUsernameUnique(value: string | number): Promise<string | boolean> {
        if(value === "") return true

        const result: string = await (await fetch(`${process.env.VUE_APP_GATEMAY_ADDRESS}/unique/username/${value}`)).json()
        if(value.toString().toLowerCase() !== result.toLowerCase()) return true

        return false
    }

    public async minLength(value: string, min: number): Promise<string | boolean> {
        if(value.length < min) return false
        return true
    }

    public async maxLength(value: string, max: number): Promise<string | boolean> {
        if(value.length > max) return false
        return true
    }

    public async isEqual(value: string, state: any): Promise<boolean | string> {
        if(value === state) return true
        return false
    }
}