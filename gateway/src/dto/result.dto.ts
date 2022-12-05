export interface IResult<T> {
    data?: T
    error?: { statusCode: number, message: string}
}