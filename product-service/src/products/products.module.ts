import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FILTER_TOKEN, LOGGER_TOKEN, PAGINATOR_TOKEN, PRODUCTS_SERVICE_TOKEN, RESULTER_TOKEN } from "src/common/constants/inject-tokens.constant"
import { Filter } from "src/common/filter"
import { Logger } from "src/common/logger"
import { Paginator } from "src/common/paginator"
import { Resulter } from "src/common/resulter"
import { Category } from "./entities/category.entity"
import { Product } from "./entities/product.entity"
import { Subcategory } from "./entities/subcategory.entity"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Subcategory])
  ],
  providers: [
    { provide: PRODUCTS_SERVICE_TOKEN, useClass: ProductsService },
    { provide: RESULTER_TOKEN, useClass: Resulter },
    { provide: FILTER_TOKEN, useClass: Filter },
    { provide: PAGINATOR_TOKEN, useClass: Paginator },
    { provide: LOGGER_TOKEN, useClass: Logger },
  ],
  controllers: [ProductsController]
})

export class ProductsModule {}