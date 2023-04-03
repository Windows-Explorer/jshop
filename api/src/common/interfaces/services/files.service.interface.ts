export interface IFilesService {
    findFilesFromPublic(): Promise<string[]>
    removeFileFromPubllic(filename: string): Promise<void>
}