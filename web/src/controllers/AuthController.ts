import { Request, Response, NextFunction } from 'express'
import handleToken from '../services/handleToken'
import User from '../entities/User'

export default class AuthController {
  authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const user = new User()
      user.username = 'ammreis'
      const token = handleToken.createToken(user)
      res.json(token)
    } catch (err) {
      next(err)
    }
  }
}
