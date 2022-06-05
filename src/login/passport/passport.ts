import { ForbiddenException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { LoginRepository } from '../login.repository'
import { Payload } from './jwt.payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginRepository: LoginRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT,
      ignoreExpiration: false,
    })
  }

  async validate(payload: Payload) {
    const { index } = payload
    const user = await this.loginRepository.vaildate(index)
    if (user) {
      return payload
    } else {
      throw new ForbiddenException()
    }
  }
}
