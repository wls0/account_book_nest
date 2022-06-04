import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { LoginController } from './login.controller'
import { LoginRepository } from './login.repository'
import { LoginService } from './login.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from 'src/model/users.model'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.JWT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, LoginRepository],
})
export class LoginModule {}
