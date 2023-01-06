import { Body, Controller, Get, Inject, Param, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { FileInterceptor, AnyFilesInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import { IResult } from "src/dto/result.dto";
import { AdminGuard } from "src/guards/admin.guard";

@Controller("products")
export class ProtectedProductsController {
    constructor(@Inject("PRODUCTS_GATEWAY") private readonly _client: ClientKafka) {}


    @UseGuards(AdminGuard)
    @UseInterceptors(FileInterceptor("file", {
       storage: diskStorage({
        destination: "./public/images",
        filename: (req, file, callback) => {
          callback(null, file.originalname)
        }
      })
    }))
    @Post("/save/image")
    async saveImage(@UploadedFile() file: Express.Multer.File, @Res() response: Response): Promise<void> {
        response.send(file)
    }


    @UseGuards(AdminGuard)
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
            destination: "./public/images",
            filename: (req, file, callback) => {
                callback(null, file.originalname)
            }
        })
    }))
    @Post("/save/images")
    async saveMultipleImages(@UploadedFiles() files: Express.Multer.File[], @Res() response: Response): Promise<void> {
        response.send(files)
    }
    

    @UseGuards(AdminGuard)
    @Post("/save")
    async save(@Body() product: any, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("products.save", product).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @UseGuards(AdminGuard)
    @Post("/savemany")
    async saveMany(@Body() product: any, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("products.saveMany", product).toPromise()
        response.status(result.statusCode).send(result.message)
    }

    @UseGuards(AdminGuard)
    @Get("/remove/:id")
    async removeOne(@Param("id") id: number, @Res() response: Response): Promise<void> {
        const result: IResult<any> = await this._client.send("products.removeOne", id).toPromise()
        response.status(result.statusCode).send(result.message)
    }
}