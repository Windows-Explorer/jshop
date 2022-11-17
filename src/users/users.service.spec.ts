import { MockFactory, Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'


describe('UsersService', () => {
  let userService: UsersService
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn()
          }
        }
      ]
    }).compile()
    
    userService = module.get<UsersService>(UsersService)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  })


  it('userService should be defined', () => expect(userService).toBeDefined())
  it("userRepository should be defined", () => expect(userRepository).toBeDefined())

  describe("findAll", () => {
    it("should get array of users from database", async () => {

    })
  })

})
