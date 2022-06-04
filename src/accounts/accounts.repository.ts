import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Accounts } from 'src/model/accounts.model'
import { Repository } from 'typeorm'

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountModel: Repository<Accounts>,
  ) {}
  async writeAccount(data) {
    try {
      const { userIndex, date, bigCategory, smallCategory, card, cost } = data
      await this.accountModel.save({
        userIndex,
        date,
        bigCategory,
        smallCategory,
        card,
        cost,
      })
    } catch (E) {
      throw new InternalServerErrorException()
    }
  }
}
