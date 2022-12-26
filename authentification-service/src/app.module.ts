import { Module } from "@nestjs/common"
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AuthModule } from "./auth/auth.module"
import { User } from "./users/entities/user.entity"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UsersModule } from "./users/users.module"
import { UniqueModule } from "./unique/unique.module"

@Module({
  imports: [
    UsersModule,
    AuthModule,
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
        entities: [User],
        synchronize: true
      })
    }),
    UniqueModule,
  ],
  controllers: [AppController],
})

export class AppModule {}
