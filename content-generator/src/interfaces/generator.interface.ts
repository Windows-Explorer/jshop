export interface IGenerator<T> {
    generate(): Promise<void>
    get(): Promise<T[]>
}