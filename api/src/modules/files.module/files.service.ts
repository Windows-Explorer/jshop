import { Injectable } from "@nestjs/common"
import { IFilesService } from "src/common/interfaces/services/files.service.interface"
import * as fs from "fs/promises"
import { IMAGES_DIRECTORY_PATH } from "src/common/constants/file-directories.constants"

@Injectable()
export class FilesService implements IFilesService {

    async findFilesFromPublic(): Promise<string[]> {
        const files = await fs.readdir(IMAGES_DIRECTORY_PATH)
        return files
    }

    async removeFileFromPubllic(filename: string): Promise<void> {
        await fs.unlink(`${IMAGES_DIRECTORY_PATH}${filename}`)
    }
}
