import { IValidator } from "../interfaces/validator.interfaces/validator.interface"

export class Validator implements IValidator {
    async isNumber(value: any): Promise<boolean> {
        try {
            if (Number(value)) return true
            else return false
        }
        catch (error) {
            return false
        }
    }

    async isEmail(value: string): Promise<boolean> {
        try {
            const emailPatter: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return emailPatter.test(value)
        }
        catch (error) {
            return false
        }
    }

    async minLength(value: string, minLength: number): Promise<boolean> {
        try {
            if (value.length >= minLength) return true
            else return false
        }
        catch (error) {
            return false
        }
    }

    async maxLength(value: string, maxLength: number): Promise<boolean> {
        try {
            if (value.length <= maxLength) return true
            else return false
        }
        catch (error) {
            return false
        }
    }

    async isRequired(value: any): Promise<boolean> {
        try {
            if (String(value).length > 0) return true
            else return false
        }
        catch (error) {
            return false
        }
    }
}