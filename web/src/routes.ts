import { Router } from 'express'
import { UserController, AuthController, CityController } from './controllers'
import { validateToken } from './services/handleToken'

const routes = Router()

const auth = new AuthController()
routes.post('/authenticate', auth.authenticate)

const user = new UserController()
routes.get('/users', validateToken, user.index)
routes.post('/users', user.store)

const city = new CityController()
routes.get('/citys', city.index)
routes.post('/citys', city.store)

export default routes
