import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Accounts } from './accounts.model'

@Entity()
@Unique(['id'])
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  @IsString()
  index: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  @Column('varchar')
  id: string

  @IsNotEmpty()
  @IsString()
  @Column('varchar')
  password: string

  @IsNotEmpty()
  @IsString()
  @Column('varchar')
  salt: string

  @IsNotEmpty()
  @IsDate()
  @CreateDateColumn()
  createAt: Date

  @IsNotEmpty()
  @IsDate()
  @UpdateDateColumn()
  updateAt: Date

  @OneToMany(() => Accounts, (accounts) => accounts.user)
  accounts: Accounts[]
}
