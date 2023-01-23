import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { ProductsModule } from "./products/products.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { FilesModule } from "./files/files.module"
import { CardModule } from "./card/card.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    }),
    AuthModule,
    ProductsModule,
    FilesModule,
    CardModule
  ],
  controllers: [AppController]
})

export class AppModule { }
