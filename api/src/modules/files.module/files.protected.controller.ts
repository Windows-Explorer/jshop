import { Controller, Delete, Get, Inject, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common"
import { AnyFilesInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { IMAGES_DIRECTORY_PATH } from "src/common/constants/file-directories.constants"
import { FILES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { AdminGuard } from "src/common/guards/admin.guard"
import { IFilesService } from "src/common/interfaces/services/files.service.interface"

@Controller("files")
export class FilesProtectedController {
    constructor(@Inject(FILES_SERVICE_TOKEN) private readonly _filesService: IFilesService) { }

    @UseGuards(AdminGuard)
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
            destination: IMAGES_DIRECTORY_PATH,
            filename: (req, file, callback) => {
                const filename: string = Buffer.from(file.originalname, 'latin1').toString('utf8')
                callback(null, filename)
            }
        })
    }))
    @Post("/")
    async saveMultipleFiles(@UploadedFiles() files: Express.Multer.File[]): Promise<Express.Multer.File[]> {
        return files
    }

    @UseGuards(AdminGuard)
    @Get("/")
    async getFileList(): Promise<string[]> {
        return await this._filesService.findFilesFromPublic()
    }

    @UseGuards(AdminGuard)
    @Delete("/:filename")
    async removeFile(@Param("filename") filename: string): Promise<string[]> {
        await this._filesService.removeFileFromPubllic(filename)
        return await this._filesService.findFilesFromPublic()
    }
}