import { Request, Response } from 'express'

interface IUser {
  name: string
  email: string
  city?: string
}

const users: IUser[] = [
  {
    name: 'Allisson Mateus',
    email: 'allissonmateus89@gmail.com',
    city: 'Palmas'
  }
]

export default {
  async index(req: Request, res: Response) {
    res.json(users)
  },
  async store(req: Request, res: Response) {
    const user: IUser = req.body
    users.push(user)
    res.json(user)
  }
}
