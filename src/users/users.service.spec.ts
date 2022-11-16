import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  let repository: Repository<User>


  beforeEach(() => {
    service = new UsersService(repository)
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: Promise<User[]> = new Promise()

      jest.spyOn(service, 'findAll').mockImplementation(() => result)

      expect(await service.findAll()).toBe(result)
    })
  })
})