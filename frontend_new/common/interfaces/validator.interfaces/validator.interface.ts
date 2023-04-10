export interface IValidator {
    isEmail(value: string): Promise<boolean>
    isNumber(value: any): Promise<boolean>
    minLength(value: string, minLength: number): Promise<boolean>
    maxLength(value: string, maxLength: number): Promise<boolean>
    isRequired(value: any): Promise<boolean>
}