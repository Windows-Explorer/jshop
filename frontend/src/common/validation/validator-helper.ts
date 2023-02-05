import { IValidatorHelper } from "../interfaces/validator-helper.interface"

export class ValidatorHelper implements IValidatorHelper {

    async withMessage(message: string, value: string | boolean): Promise<string | boolean> {
        if(value) return true
        return message
    }

}