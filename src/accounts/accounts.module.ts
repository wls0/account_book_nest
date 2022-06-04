import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Accounts } from 'src/model/accounts.model'
import { AccountsController } from './accounts.controller'
import { AccountsRepository } from './accounts.repository'
import { AccountsService } from './accounts.service'

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  controllers: [AccountsController],
  providers: [AccountsService, AccountsRepository],
})
export class AccountsModule {}
