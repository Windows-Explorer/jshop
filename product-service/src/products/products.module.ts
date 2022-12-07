import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'
import { Game } from './entities/game.entity'
import { ProductsController } from './products.controller'
import { BooksService } from './services/books.service'
import { GamesService } from './services/games.service'

@Module({
  imports: [TypeOrmModule.forFeature([Book, Game])],
  providers: [BooksService, GamesService],
  controllers: [ProductsController]
})

export class ProductsModule {}
