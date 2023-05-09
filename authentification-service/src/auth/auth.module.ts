import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { JwtModule, JwtModuleOptions, JwtService } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { UsersModule } from "src/users/users.module"
import { AUTH_SERVICE_TOKEN, CONFIG_SERVICE_TOKEN, JWT_SERVICE_TOKEN, OUTPUT_TOKEN } from "src/common/constants/inject-tokens.constant"
import { AuthController } from "./auth.controller"
import { Output } from "src/common/output"

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRESIN") }
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_SERVICE_TOKEN, useClass: AuthService },
    { provide: JWT_SERVICE_TOKEN, useClass: JwtService },
    { provide: CONFIG_SERVICE_TOKEN, useClass: ConfigService },
    { provide: OUTPUT_TOKEN, useClass: Output }
  ],
  exports: [AUTH_SERVICE_TOKEN, JWT_SERVICE_TOKEN]
})

export class AuthModule { }
