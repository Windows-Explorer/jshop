import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { AuthModule } from "./modules/auth.module/auth.module"
import { CardModule } from "./modules/cards.module/card.module"
import { CardColorsModule } from "./modules/card-colors.module/card-colors.module"
import { CardTypesModule } from "./modules/card-types.module/card-types.module"
import { CheckUniqueModule } from "./modules/check-unique.module/check-unique.module"
import { FilesModule } from "./modules/files.module/files.module"
import { ProductsModule } from "./modules/products.module/products.module"
import { UsersModule } from "./modules/users.module/users.module"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Product } from "./modules/products.module/entities/product.entity"
import { CardType } from "./modules/card-types.module/entities/card-type.entity"
import { CardColor } from "./modules/card-colors.module/entities/card-color.entity"
import { User } from "./modules/users.module/entities/user.entity"
import { Card } from "./modules/cards.module/entities/card.entity"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    }),
    ConfigModule.forRoot({ isGlobal: true, cache: false }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: "mysql",
        port: configService.get<number>("DATABASE_PORT"),
        host: configService.get<string>("DATABASE_HOST"),
        database: configService.get<string>("DATABASE_DATABASE"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        username: configService.get<string>("DATABASE_USERNAME"),
        entities: [User, Product, CardType, CardColor, Card],
        synchronize: true
      })
    }),
    AuthModule, CardModule, CardColorsModule, CardTypesModule, CheckUniqueModule, FilesModule, ProductsModule, UsersModule
  ],
  controllers: []
})

export class AppModule { }
