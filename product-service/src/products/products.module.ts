import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PRODUCTS_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { Resulter } from "src/common/resulter"
import { Product } from "./entities/product.entity"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"

@Module({
  imports: [ TypeOrmModule.forFeature([ Product ]) ],
  providers: [
    { provide: PRODUCTS_SERVICE_TOKEN, useClass: ProductsService },
    { provide: RESULTER_TOKEN, useClass: Resulter }
  ],
  controllers: [ProductsController]
})

export class ProductsModule {}