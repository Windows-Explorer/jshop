import { Module } from "@nestjs/common"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { Card } from "./card/entities/card.entity"
import { Color } from "./card/entities/color.entity"
import { CardModule } from "./card/card.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: "mysql",
        port: configService.get<number>("DATABASE_PORT"),
        host: configService.get<string>("DATABASE_HOST"),
        database: configService.get<string>("DATABASE_DATABASE"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        username: configService.get<string>("DATABASE_USERNAME"),
        entities: [Card, Color],
        synchronize: true
      })
    }),
    CardModule
  ]
})

export class AppModule {}
