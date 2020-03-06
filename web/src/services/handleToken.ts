import { Request, Response, Errback, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import User from '../entities/User'

export default {
  createToken({ username }: User) {
    try {
      const token = jwt.sign({ username }, 'shhhhh')
      return { token }
    } catch (err) {
      throw new Error(err)
    }
  },
  validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header('token') || ''
      const isToken = jwt.verify(token, 'shhhhh')
      next()
    } catch (err) {
      next(err)
    }
  }
}
