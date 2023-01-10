import { Inject, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices"
import { AuthModule } from "src/auth/auth.module"
import { ProductsController } from "./products.controller"
import { ProtectedProductsController } from "./protected.products.controller"

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: "PRODUCTS_GATEWAY",
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
  controllers: [ProductsController, ProtectedProductsController]
})
export class ProductsModule {
  constructor(@Inject("PRODUCTS_GATEWAY") private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf("products.findAll")
    this.client.subscribeToResponseOf("products.findById")
    this.client.subscribeToResponseOf("products.save")
    this.client.subscribeToResponseOf("products.saveMany")
    this.client.subscribeToResponseOf("products.removeOne")

    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.close()
  }
}
