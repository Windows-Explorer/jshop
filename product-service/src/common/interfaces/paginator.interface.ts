import { FindManyOptions } from "typeorm"

export interface IPaginator {
    paginateFromPageNumber(page: number, inputOptions: FindManyOptions): Promise<FindManyOptions>
}