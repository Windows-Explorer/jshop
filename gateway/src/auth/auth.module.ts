import { Inject, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices"
import { AuthController } from "./auth.controller"
import { UniqueController } from "./unique.controller"

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "AUTH_GATEWAY",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: "auth-producer",
              brokers: [`${configService.get<string>("BROKER_HOST")}:${configService.get<number>("BROKER_PORT")}`]
            },
            consumer: {
              groupId: "auth-consumer"
            }
          }
        })
      }
    ])
  ],
  controllers: [ AuthController, UniqueController ],
  exports: [ClientsModule]
})

export class AuthModule {
  constructor(@Inject("AUTH_GATEWAY") private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf("get.auth.verify")
    this.client.subscribeToResponseOf("get.auth.verify.admin")
    this.client.subscribeToResponseOf("get.unique.email")
    this.client.subscribeToResponseOf("get.unique.username")
    this.client.subscribeToResponseOf("post.auth.signUp")
    this.client.subscribeToResponseOf("post.auth.signIn")

    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.close()
  }
}
