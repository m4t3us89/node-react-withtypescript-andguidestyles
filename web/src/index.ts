import Express from 'express'

const app = Express()

app.get('/', (req, res) => {
  return res.send('Helo Word')
})

app.listen(3333)
