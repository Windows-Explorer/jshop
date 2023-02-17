import { Body, Controller, Delete, Get, Inject, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common"
import { FileInterceptor, AnyFilesInterceptor } from "@nestjs/platform-express"
import { Response } from "express"
import { diskStorage } from "multer"
import { IMAGES_DIRECTORY_PATH } from "src/common/constants/file-directories.constants"
import { FILES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IFilesService } from "src/common/interfaces/files.service.interface"
import { AdminGuard } from "src/guards/admin.guard"

@Controller("api/files")
export class FilesProtectedController {
    constructor(@Inject(FILES_SERVICE_TOKEN) private readonly _filesService: IFilesService) {}

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
    async saveMultipleFiles(@UploadedFiles() files: Express.Multer.File[], @Res() response: Response): Promise<void> {
        response.send(files)
    }

    @UseGuards(AdminGuard)
    @Get("/")
    async getFileList(@Res() response: Response): Promise<void> {
        response.send(await this._filesService.findFilesFromPublic())
    }

    @UseGuards(AdminGuard)
    @Delete("/:filename")
    async removeFile(@Param("filename") filename: string, @Res() response: Response): Promise<void> {
        await this._filesService.removeFileFromPubllic(filename)
        response.send(await this._filesService.findFilesFromPublic())
    }
}