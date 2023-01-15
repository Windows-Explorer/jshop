import { Body, Controller, Delete, Get, Inject, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common"
import { FileInterceptor, AnyFilesInterceptor } from "@nestjs/platform-express"
import { Response } from "express"
import { diskStorage } from "multer"
import { FILES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { IFilesService } from "src/common/interfaces/files.service.interface"
import { AdminGuard } from "src/guards/admin.guard"

@Controller("files")
export class FilesProtectedController {
    constructor(@Inject(FILES_SERVICE_TOKEN) private readonly _filesService: IFilesService) {}

    @UseGuards(AdminGuard)
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
            destination: "./public/images",
            filename: (req, file, callback) => {
                const filename: string = Buffer.from(file.originalname, 'latin1').toString('utf8')
                callback(null, filename)
            }
        })
    }))
    @Post("/")
    async saveMultipleImages(@UploadedFiles() files: Express.Multer.File[], @Res() response: Response): Promise<void> {
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