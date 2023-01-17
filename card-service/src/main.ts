import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"
import { AppModule } from "./app.module"
import { Resulter } from "./common/resulter"
import { AllExceptionsFilter } from "./extentions/all.exception-filter"



async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //       transport: Transport.KAFKA,
  //       options: {
  //           client: {
  //           brokers: [`${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`],
  //       },
  //       consumer: {
  //           groupId: "products-consumer",
  //           allowAutoTopicCreation: true
  //       }
  //   }
  // })
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AllExceptionsFilter(new Resulter()))
  app.useGlobalPipes(new ValidationPipe())

  console.log(app.get(ConfigService))

  await app.listen()
  console.log("Product service is running")
}

bootstrap()