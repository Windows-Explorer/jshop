export interface IValidator {
    isRequired(value: string | number): Promise<string | boolean>
    isEmail(value: string): Promise<string | boolean>
    isPhoneNumber(value: string): Promise<string | boolean>
    isEmailUnique(value: string | number): Promise<string | boolean>
    isUsernameUnique(value: string | number): Promise<string | boolean>
    minLength(value: string, min: number): Promise<string | boolean>
    maxLength(value: string, max: number): Promise<string | boolean>
    isEqual(value: string, state: any): Promise<boolean | string>
}