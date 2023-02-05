export interface IValidatorHelper {
    withMessage(message: string, value: string | boolean): Promise<string | boolean>
}