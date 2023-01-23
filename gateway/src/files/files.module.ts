import { Module } from "@nestjs/common"
import { AuthModule } from "src/auth/auth.module"
import { FILES_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { FilesProtectedController } from "./files.protected.controller"
import { FilesService } from "./files.service"

@Module({
    imports: [
        AuthModule
    ],
    providers: [
        { provide: FILES_SERVICE_TOKEN, useClass: FilesService }
    ],
    controllers: [ FilesProtectedController ]
})
export class FilesModule {}