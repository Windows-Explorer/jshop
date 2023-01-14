import { Injectable } from "@nestjs/common"
import { IFilesService } from "src/common/interfaces/files.service.interface"
import * as fs from "fs/promises"

@Injectable()
export class FilesService implements IFilesService {

    async findFilesFromPublic(): Promise<string[]> {
        const files = await fs.readdir("./public/images")
        return files
    }
}
