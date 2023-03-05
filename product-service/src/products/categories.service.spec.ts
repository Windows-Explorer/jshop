import { Logger } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { Filter } from "../common/filter"
import { Paginator } from "../common/paginator"
import { CategoriesService } from "./categories.service"
import { CATEGORIES_SERVICE_TOKEN, FILTER_TOKEN, LOGGER_TOKEN, PAGINATOR_TOKEN } from "../common/constants/inject-tokens.constant"
import { getDataSourceToken, TypeOrmModule } from "@nestjs/typeorm"
import { Category } from "./entities/category.entity"
import { Subcategory } from "./entities/subcategory.entity"
import { ICategory } from "src/common/interfaces/category.interface"
import { DataSource, DeleteResult } from "typeorm"

describe("CategoriesService", () => {

  let categoriesService: CategoriesService
  let categoriesDataSource: DataSource

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: CATEGORIES_SERVICE_TOKEN, useClass: CategoriesService },
        { provide: FILTER_TOKEN, useClass: Filter },
        { provide: PAGINATOR_TOKEN, useClass: Paginator },
        { provide: LOGGER_TOKEN, useClass: Logger },
      ],
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          port: 3306,
          host: "194.58.100.225",
          database: "jshop",
          password: "jshop_test_password",
          username: "jshop_user",
          entities: [Category, Subcategory],
          synchronize: false
        }),
        TypeOrmModule.forFeature([Category, Subcategory])
      ]
    }).compile()

    categoriesService = testingModule.get<CategoriesService>(CATEGORIES_SERVICE_TOKEN)
    categoriesDataSource = testingModule.get<DataSource>(getDataSourceToken())
  })

  it("should be defined", async () => {
    expect(categoriesService).toBeDefined()
  })

  it("should clear database", async () => {
    const deleteAllSpy = jest.spyOn(categoriesService, "deleteAll")

    const result: DeleteResult = await categoriesService.deleteAll()
    console.log(result)
    
    expect(deleteAllSpy).toHaveBeenCalled()
    
  })

  it("should add 1 category to database", async () => {
    const saveSpy = jest.spyOn(categoriesService, "save")

    const category: ICategory = {
      name: "name",
      description: "description"
    }
    await categoriesService.deleteAll()
    const result: ICategory = await categoriesService.save(category)
    expect(saveSpy).toHaveBeenCalledWith(category)

    expect(result.name).toEqual(category.name)
    expect(result.description).toEqual(category.description)
  })

  it('should call findAll method', async () => {
    const findAllSpy = jest.spyOn(categoriesService, "findAll")
    const result: ICategory[] = await categoriesService.findAll()
    expect(findAllSpy).toHaveBeenCalled()
    expect(result.length).not.toEqual(0)
  })

  afterAll(done => {
    jest.clearAllMocks()
    categoriesDataSource.close()
    done()
  })
  
})