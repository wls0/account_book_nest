import { ForbiddenException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { LoginRepository } from '../login.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginRepository: LoginRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT,
      ignoreExpiration: false,
    })
  }

  async tokenValidate(index: string) {
    const user = await this.loginRepository.vaildate(index)
    if (user) {
      return user
    } else {
      throw new ForbiddenException()
    }
  }
}
