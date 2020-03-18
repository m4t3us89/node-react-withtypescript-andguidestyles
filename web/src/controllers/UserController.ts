import { Request, Response, NextFunction } from 'express'
import { getManager } from 'typeorm'
import validateEntity from '../services/validateFieldsEntity'
import { User, Address } from '../entities'

export default class UserController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await getManager().find(User)
      res.json(users)
    } catch (err) {
      next(err)
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, username, password, address } = req.body
      const user = new User()
      user.name = name
      user.email = email
      user.username = username

      user.password = password

      const { city, street, number } = address
      const newAdress = new Address()
      newAdress.city = city
      newAdress.street = street
      newAdress.number = number

      await validateEntity(newAdress)

      await getManager().save(Address, newAdress)

      user.address = newAdress
      console.log('antes')
      await validateEntity(user)
      console.log('depois')
      const newUser = await getManager().save(User, user)
      res.json(newUser)
    } catch (err) {
      next(err)
    }
  }
}
