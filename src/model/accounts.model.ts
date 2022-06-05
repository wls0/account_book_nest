import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Users } from './users.model'

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  index: number

  @ManyToOne(() => Users, (user) => user.accounts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: string

  @Column('varchar')
  bigCategory: string

  @Column('varchar')
  smallCategory: string

  @Column('varchar')
  card: string

  @Column('int')
  cost: number

  @Column('varchar')
  date: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
