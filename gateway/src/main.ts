import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  console.log(app.get(ConfigService))
  await app.listen(3000)
  console.log("Gateway is running")
}

bootstrap()
