import { Injectable } from '@nestjs/common'
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm'
import { Book } from '../entities/book.entity'

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    ){}


    async findById(bookId: number): Promise<Book> {
        return await this.booksRepository.findOne({ where: { id: bookId } })
    }

    async findAll(): Promise<Book[]> {
        return await this.booksRepository.find()
    }

    async create(book: Book): Promise<Book> {
        return await this.booksRepository.save(book)
    }

    async update(book: Book): Promise<Book> {
        return await this.booksRepository.save(book)
    }
}
