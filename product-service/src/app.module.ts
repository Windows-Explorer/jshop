import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ProductsModule } from './products/products.module'
import { Product } from './products/entities/product.entity'
import { PaymentController } from './payment/payment.controller';
import { PaymentModule } from './payment/payment.module'

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
        entities: [Product],
        synchronize: true
      })
    }),
    ProductsModule,
    PaymentModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
