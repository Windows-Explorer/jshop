import { Injectable } from '@nestjs/common'
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm'
import { Game } from '../entities/game.entity'

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game) private readonly gamesRepository: Repository<Game>,
    ){}


    async findById(gameId: number): Promise<Game> {
        return await this.gamesRepository.findOne({ where: { id: gameId } })
    }

    async findAll(): Promise<Game[]> {
        return await this.gamesRepository.find()
    }

    async create(game: Game): Promise<Game> {
        return await this.gamesRepository.save(game)
    }

    async update(game: Game): Promise<Game> {
        return await this.gamesRepository.save(game)
    }
}
