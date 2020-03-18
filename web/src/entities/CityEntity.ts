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

@Entity()
export default class City {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  @Length(2, 2)
  uf!: string
}
