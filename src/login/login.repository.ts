import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from 'src/model/users.model'
import { Repository } from 'typeorm'

@Injectable()
export class LoginRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userModel: Repository<Users>,
  ) {}

  async login(id: string) {
    const user = await this.userModel.findOneBy({ id })
    if (user) {
      return user
    } else {
      return false
    }
  }

  async vaildate(index: string) {
    const user = await this.userModel.findOneBy({ index })
    if (user) {
      return index
    } else {
      return false
    }
  }
}
