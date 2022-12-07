import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BooksService } from './books.service'
import { GamesService } from './games.service'
import { Product } from './entities/product.entity'
import { ProductsController } from './products.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [BooksService, GamesService],
  controllers: [ProductsController]
})

export class ProductsModule {}
