import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
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
}
