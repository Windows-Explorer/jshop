import { Body, Controller, Inject, Param, Post, Res, UseGuards } from "@nestjs/common"
import { Delete, UploadedFile, UseInterceptors } from "@nestjs/common/decorators"
import { ClientKafka } from "@nestjs/microservices"
import { FileInterceptor } from "@nestjs/platform-express"
import { Response } from "express"
import { diskStorage } from "multer"
import { IMAGES_DIRECTORY_PATH } from "src/common/constants/file-directories.constants"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { AdminGuard } from "src/guards/admin.guard"

@Controller("products/categories")
export class CategoriesProtectedController {
    constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

    @UseGuards(AdminGuard)
    @Post("/")
    async save(@Body() product: any, @Res() response: Response) {
        const result = await this._client.send("categories.save", product).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @UseGuards(AdminGuard)
    @Delete("/:id")
    async removeOne(@Param("id") id: number, @Res() response: Response) {
        const result = await this._client.send("categories.remove", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}