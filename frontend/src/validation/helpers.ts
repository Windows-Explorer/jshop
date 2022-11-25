export const withMessage = async (message: string, validator: Promise<any>) => {
    const validationResult = await validator

    if(validationResult) return true

    else return message
}