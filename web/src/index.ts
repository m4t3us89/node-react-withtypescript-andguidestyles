import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import Routes from './routes'
import handleError from './services/handleError'
import { createConnection } from 'typeorm'

//handle variaveis de ambiente
dotenv.config()

//handle conexão com banco
;(async function() {
  try {
    await createConnection({
      name: '',
      database: 'dbsqlite',
      type: 'sqlite',
      synchronize: true,
      entities: [`${__dirname}/entities/*.ts`],
      migrations: [`${__dirname}/migrations/*.ts`]
    })
  } catch (err) {
    console.log(err)
  }
})()

const app = express()

//handle cors, body request e rotas
app.use(cors(), express.json(), Routes)

//handle error
app.use(handleError)

const port = process.env.PORT || 3333
app.listen(port, () => console.log(`On port ${port}`))
