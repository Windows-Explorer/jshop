export interface ProductsFindDto {
    page?: number,
    filter: {
        title: string,
        cost: number,
        category: string,
        subcategory: string
    }
}