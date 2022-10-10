import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [UsersModule,
    JwtModule.register({
      secret: "123",
      signOptions: { expiresIn: "3600"}
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})

export class AuthModule {}
