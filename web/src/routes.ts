import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

const user = new UserController()
routes.get('/users', user.index)
routes.post('/users', user.store)

export default routes
