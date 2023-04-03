import { Module } from "@nestjs/common"
import { ProductsController } from "./products.controller"
import { ProductsProtectedController } from "./products.protected.controller"
import { PRODUCTS_SERVICE_TOKEN } from "src/common/constants/inject-tokens.constants"
import { ProductsService } from "./products.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Product } from "./entities/product.entity"
import { AuthModule } from "../auth.module/auth.module"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule,
    ConfigModule
  ],
  controllers: [ProductsController, ProductsProtectedController],
  providers: [
    { provide: PRODUCTS_SERVICE_TOKEN, useClass: ProductsService }
  ]
})
export class ProductsModule { }
