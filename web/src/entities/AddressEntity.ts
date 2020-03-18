import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne
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
import { City } from './'

@Entity()
export default class Address {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  street!: string

  @Column()
  number!: string

  @ManyToOne(type => City)
  city: City
}
