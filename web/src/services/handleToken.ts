import { Request, Response, Errback, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { User } from '../entities'

//função para lidar com a criação do token de acesso à api
export const createToken = function({ username }: User) {
  try {
    const token = jwt.sign({ username }, 'shhhhh')
    return { token }
  } catch (err) {
    throw err
  }
}

//mildware para lidar com o token de acesso á api
export const validateToken = function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token: string = req.header('credentials') || ''
    const isToken = jwt.verify(token, 'shhhhh')
    next()
  } catch (err) {
    next(err)
  }
}
