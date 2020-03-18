import { Request, Response, NextFunction } from 'express'
import { createToken } from '../services/handleToken'
import { getManager } from 'typeorm'
import { User } from '../entities'
import bcrypt from '../services/bcrypt'

export default class AuthController {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body

      const user = await getManager().findOne(User, {
        where: [{ username }, { email: username }]
      })

      if (!user) throw { message: 'Usuário não encontrado' }

      const isEqual = await bcrypt.compare(password, user.password)

      if (!isEqual) throw { message: 'Password incorreto' }

      const token = createToken(user)
      res.json(token)
    } catch (err) {
      next(err)
    }
  }
}
