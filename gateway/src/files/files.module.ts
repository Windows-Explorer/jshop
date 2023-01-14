import { Module } from "@nestjs/common"
import { FILES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constant"
import { FilesProtectedController } from "./files.protected.controller"
import { FilesService } from "./files.service"

@Module({
    providers: [
        {
            provide: FILES_SERVICE_TOKEN, useClass: FilesService
        }
    ],
    controllers: [ FilesProtectedController ]
})
export class FilesModule {

}