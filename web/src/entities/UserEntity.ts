import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  AfterUpdate,
  OneToOne,
  JoinColumn,
  ColumnOptions,
  Unique,
  Check,
  getManager,
  AfterInsert
} from 'typeorm'
import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsNotEmpty
} from 'class-validator'
import bcrypt from '../services/bcrypt'
import { Address } from '.'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  name!: string

  @Column({ unique: true })
  @IsEmail()
  email!: string

  @Column({ unique: true })
  username!: string

  @Column()
  password!: string

  @OneToOne(type => Address)
  @JoinColumn()
  address!: Address

  @BeforeInsert()
  async cryptPasswordInsert() {
    this.password = await bcrypt.generate(this.password)
  }

  /*@BeforeInsert()
  async uniqueEmail() {
    const isEmail = await getManager().findOne(User, {
      email: this.email
    })
    if (isEmail) throw { message: `O email "${this.email}" já existe` }
  }

  @BeforeInsert()
  async uniqueUsername() {
    const isUsername = await getManager().findOne(User, {
      username: this.username
    })
    if (isUsername) throw { message: `O username "${this.username}" já existe` }
  }*/

  @BeforeUpdate()
  async cryptPasswordUpdate() {
    if (this.password) this.password = await bcrypt.generate(this.password)
  }
}
