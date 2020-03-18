import { Request, Response, NextFunction } from 'express'
import { getManager } from 'typeorm'
import { City } from '../entities'
import validateFieldsEntity from '../services/validateFieldsEntity'

export default class CityController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const citys = await getManager().find(City)
      res.json(citys)
    } catch (err) {
      next(err)
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, uf } = req.body
      const city = new City()
      city.name = name
      city.uf = uf

      await validateFieldsEntity(city)

      const newCity = await getManager().save(city)

      res.json(newCity)
    } catch (err) {
      next(err)
    }
  }
}
