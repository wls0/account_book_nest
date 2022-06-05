import { Injectable, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/login/passport/jwt.guard'
import { Payload } from 'src/login/passport/jwt.payload'
import { AccountsRepository } from './accounts.repository'
import { DateResDTO, WriteAccountResDTO } from './dto/accounts.dto'

@UseGuards(JwtAuthGuard)
@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}
  async writeAccount(
    user: Payload,
    param: DateResDTO,
    body: WriteAccountResDTO,
  ) {
    await this.accountsRepository.writeAccount(user, param, body)
    return ''
  }
}
