import { Inject, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices"
import { AuthModule } from "src/auth/auth.module"
import { PRODUCTS_KAFKA_CLIENT_TOKEN } from "src/common/constants/inject-tokens.constants"
import { CategoriesController } from "./categories.controller"
import { ProductsController } from "./products.controller"
import { ProductsProtectedController } from "./products.protected.controller"
import { CategoriesProtectedController } from "./categories.protected.controller"

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: PRODUCTS_KAFKA_CLIENT_TOKEN,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: "products-producer",
              brokers: [`${configService.get<string>("BROKER_HOST")}:${configService.get<number>("BROKER_PORT")}`]
            },
            consumer: {
              groupId: "products-consumer"
            }
          }
        })
      }
    ])
  ],
  controllers: [ProductsController, ProductsProtectedController, CategoriesController, CategoriesProtectedController]
})
export class ProductsModule {
  constructor(@Inject(PRODUCTS_KAFKA_CLIENT_TOKEN) private readonly _client: ClientKafka) { }

  async onModuleInit() {
    this._client.subscribeToResponseOf("products.findAll")
    this._client.subscribeToResponseOf("products.count")
    this._client.subscribeToResponseOf("categories.findAll")
    this._client.subscribeToResponseOf("categories.save")
    this._client.subscribeToResponseOf("categories.remove")
    this._client.subscribeToResponseOf("products.findById")
    this._client.subscribeToResponseOf("products.save")
    this._client.subscribeToResponseOf("products.saveMany")
    this._client.subscribeToResponseOf("products.remove")

    await this._client.connect()
  }

  async onModuleDestroy() {
    await this._client.close()
  }
}
