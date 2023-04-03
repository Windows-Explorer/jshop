import { Module } from "@nestjs/common"
import { FILES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { FilesProtectedController } from "./files.protected.controller"
import { FilesService } from "./files.service"
import { AuthModule } from "../auth.module/auth.module"
import { ConfigModule } from "@nestjs/config"

@Module({
    imports: [
        AuthModule,
        ConfigModule
    ],
    providers: [
        { provide: FILES_SERVICE_TOKEN, useClass: FilesService }
    ],
    controllers: [FilesProtectedController]
})
export class FilesModule { }