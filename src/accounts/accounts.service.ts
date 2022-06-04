import { Injectable, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/login/passport/jwt.guard'
import { Payload } from 'src/login/passport/jwt.payload'
import { AccountsRepository } from './accounts.repository'
import { DateResDTO, writeAccountResDTO } from './dto/accounts.dto'

@UseGuards(JwtAuthGuard)
@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}
  async writeAccount(
    user: Payload,
    param: DateResDTO,
    body: writeAccountResDTO,
  ) {
    const { index } = user
    const { date } = param
    const { bigCategory, smallCategory, card, cost } = body

    await this.accountsRepository.writeAccount({
      userIndex: index,
      date,
      bigCategory,
      smallCategory,
      card,
      cost,
    })
    return ''
  }
}
