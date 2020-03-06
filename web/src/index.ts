import express from 'express'
import cors from 'cors'
import Routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(Routes)

const port = process.env.PORT || 3333
app.listen(port, () => console.log(`On port ${port}`))
