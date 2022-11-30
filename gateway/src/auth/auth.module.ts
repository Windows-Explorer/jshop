import { Inject, Injectable, Module } from '@nestjs/common'
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices'
import { AuthController } from './auth.controller'
import { UniqueController } from './unique.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTH_GATEWAY",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "auth-producer",
            brokers: ['192.168.43.74:9092']
          },
          consumer: {
            groupId: "auth-consumer"
          }
        }
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
    this.client.subscribeToResponseOf("get.unique.email")
    this.client.subscribeToResponseOf("get.unique.username")
    this.client.subscribeToResponseOf("post.auth.signUp")
    this.client.subscribeToResponseOf("post.auth.signIn")

    await this.client.connect()
  }

  async onModuleDestroy() {
    await this.client.connect()
  }
}
