import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'
import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max
} from 'class-validator'
import bcrypt from '../services/bcrypt'

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
  city!: string

  @Column()
  password!: string

  @BeforeInsert()
  async cryptPasswordInsert() {
    this.password = await bcrypt.generate(this.password)
  }

  @BeforeUpdate()
  async cryptPasswordUpdate() {
    if (this.password) this.password = await bcrypt.generate(this.password)
  }
}
