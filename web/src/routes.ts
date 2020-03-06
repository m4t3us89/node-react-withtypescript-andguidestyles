import { Router } from 'express'
import UserController from './controllers/UserController'
import AuthController from './controllers/AuthController'
import HandleTokenService from './services/handleToken'

const routes = Router()

const auth = new AuthController()
routes.post('/authenticate', auth.authenticate)

const user = new UserController()
routes.get('/users', HandleTokenService.validateToken, user.index)
routes.post('/users', user.store)

export default routes
