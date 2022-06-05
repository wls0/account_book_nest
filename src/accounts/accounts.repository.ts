import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Payload } from 'src/login/passport/jwt.payload'
import { Accounts } from 'src/model/accounts.model'
import { Repository } from 'typeorm'
import { DateResDTO, WriteAccountResDTO } from './dto/accounts.dto'

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountModel: Repository<Accounts>,
  ) {}
  async writeAccount(
    user: Payload,
    param: DateResDTO,
    body: WriteAccountResDTO,
  ) {
    try {
      const { index } = user
      const { date } = param
      const { bigCategory, smallCategory, card, cost } = body
      await this.accountModel.save({
        user: index,
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
