import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ITokenPayload } from "../interfaces/jwt-payload.interface"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly configService: ConfigService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>("JWT_SECRET")
    })
  }

  async validate(payload: ITokenPayload) {
    return { id: payload.id, email: payload.email, role: payload.role }
  }
}