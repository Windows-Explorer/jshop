export interface IFilesService {
    findFilesFromPublic(): Promise<string[]>
}