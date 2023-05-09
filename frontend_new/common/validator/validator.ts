import params from "~~/params"
import { IValidator } from "../interfaces/validator.interfaces/validator.interface"

export class Validator implements IValidator {
    async isUsernameUnique(value: string): Promise<boolean> {
        try {
            const result: boolean = await (await fetch(`${params.api_host}/api/unique/username/${value}`)).json()
            return !result
        }
        catch {
            return false
        }
    }

    async isEmailUnique(value: string): Promise<boolean> {
        try {
            const result: boolean = await (await fetch(`${params.api_host}/api/unique/email/${value}`)).json()
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