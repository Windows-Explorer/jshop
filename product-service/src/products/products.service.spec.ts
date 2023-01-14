import { ConfigModule, ConfigService } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken, TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Product } from "./entities/product.entity"
import { ProductsModule } from "./products.module"
import { ProductsService } from "./products.service"

describe("Products service", () => {
    let productsService: ProductsService
    let productsRepository: Repository<Product>

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: {
                        findAll: jest.fn(),
                        find: jest.fn()
                    }
                }
            ]
        }).compile()
        productsRepository = module.get<Repository<Product>>(getRepositoryToken(Product))
        productsService = module.get<ProductsService>(ProductsService)
    })

    it("should be defined", async () => {
        console.log(await productsService.findAll())
        expect(productsRepository).toBeDefined()
    })
})