import params from "~~/params"
import { IValidator } from "./interfaces/validator.interface"

export class Validator implements IValidator {
    async isPhoneNumber(value: string): Promise<boolean> {
        try {
            const phoneRegExp = /((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}/
            return phoneRegExp.test(value)
        }
        catch {
            return false
        }
    }
    async isUsernameUnique(value: string): Promise<boolean> {
        try {
            const result: boolean = await (await fetch(`${params.api_host}/unique/username/${value}`)).json()
            return !result
        }
        catch {
            return false
        }
    }

    async isEmailUnique(value: string): Promise<boolean> {
        try {
            const result: boolean = await (await fetch(`${params.api_host}/unique/email/${value}`)).json()
            return !result
        }
        catch {
            return false
        }
    }

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