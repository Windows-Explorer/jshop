import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle("API Swagger")
    .setDescription("API Gateway methods")
    .setVersion("0.1")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/", app, document)

  console.log(app.get(ConfigService))
  await app.listen(3000)
}

bootstrap()
