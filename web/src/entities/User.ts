import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  username!: string

  @Column()
  city!: string
}
