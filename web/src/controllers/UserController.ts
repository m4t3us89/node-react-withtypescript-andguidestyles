import { Request, Response, NextFunction } from 'express'
import { getManager } from 'typeorm'
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
      const user = await getManager().save(req.body)
      res.json(user)
    } catch (err) {
      next(err)
    }
  }
}
