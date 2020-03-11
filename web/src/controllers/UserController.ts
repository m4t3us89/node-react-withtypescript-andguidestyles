import { Request, Response, NextFunction } from 'express'
import { getManager } from 'typeorm'
import validateEntity from '../services/validateFieldsEntity'
import User from '../entities/User'

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
      const { name, email, username, city, password } = req.body
      const user = new User()
      user.name = name
      user.email = email
      user.username = username
      user.city = city
      user.password = password

      await validateEntity(user)

      const newUser = await getManager().save(user)
      res.json(newUser)
    } catch (err) {
      next(err)
    }
  }
}
