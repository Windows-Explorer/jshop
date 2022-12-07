import { Inject, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices'
import { ProductsController } from './products.controller'

@Module({
  imports: [
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
  controllers: [ProductsController]
})
export class ProductsModule {
  constructor(@Inject("PRODUCTS_GATEWAY") private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf("get.books.findAll")
    this.client.subscribeToResponseOf("get.games.findAll")

    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.connect()
  }
}
