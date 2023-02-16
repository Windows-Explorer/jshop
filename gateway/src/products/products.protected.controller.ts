import { Body, Controller, Get, Inject, Param, Post, Res, UseGuards } from "@nestjs/common"
import { Delete, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common/decorators"
import { ClientKafka } from "@nestjs/microservices"
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express"
import { Response } from "express"
import { diskStorage } from "multer"
import { IMAGES_DIRECTORY_PATH } from "src/common/constants/file-directories.constants"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { IResult } from "src/common/dto/result.dto"
import { AdminGuard } from "src/guards/admin.guard"

@Controller("api/products")
export class ProductsProtectedController {
    constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) {}
    
    @UseGuards(AdminGuard)
    @Post("/")
    async save(@Body() product: any, @Res() response: Response): Promise<void> {
        console.log(product)
        const result: IResult<any> = await this._client.send("products.save", product).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @UseGuards(AdminGuard)
    @Delete("/:id")
    async removeOne(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("products.removeOne", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @UseGuards(AdminGuard)
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: IMAGES_DIRECTORY_PATH,
            filename: (req, file, callback) => {
                const filename: string = Buffer.from(file.originalname, 'latin1').toString('utf8')
                callback(null, filename)
            }
        })
    }))
    @Post("/image")
    async saveImage(@UploadedFile() file: Express.Multer.File, @Res() response: Response): Promise<void> {
        response.send(file)
    }
}