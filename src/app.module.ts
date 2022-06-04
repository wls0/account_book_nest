import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoginModule } from './login/login.module'
import { AccountsModule } from './accounts/accounts.module'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Accounts } from './model/accounts.model'
import { Users } from './model/users.model'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [Accounts, Users],
      synchronize: process.env.NODE_ENV === 'local' ? true : false,
    }),
    LoginModule,
    AccountsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
