import dotenv from 'dotenv'
import express, { Errback, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import Routes from './routes'
import { createConnection } from 'typeorm'

dotenv.config()
;(async function() {
  try {
    await createConnection({
      name: '',
      database: 'dbsqlite',
      type: 'sqlite',
      //synchronize: true,
      entities: [`${__dirname}/entities/*.ts`],
      migrations: [`${__dirname}/migrations/*.ts`]
    })
  } catch (err) {
    console.log(err)
  }
})()
const app = express()

app.use(cors(), express.json(), Routes)

//handle error
app.use(function(
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(400).json(err)
})

const port = process.env.PORT || 3333
app.listen(port, () => console.log(`On port ${port}`))
