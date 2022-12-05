import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: []
})

export class AppModule {}
