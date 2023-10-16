import express from 'express'
import ProductManager from './productManager.js'

const app = express()

const products = new ProductManager()

app.get('/', (req, res) => {
  return res.send('<h1> Servidor Express </h1>')
})

app.get('/api/products', (req, res) => {
  
  const { limit } = req.query

  const data = products.getProduct()

  let limitPro

  if (limit) {
    limitPro = data.slice(0, limit)
    return res.send(limitPro)
  } else { res.json({data}) }
})

app.get('/api/products/:pid', (req, res) => {
  const {pid} = req.params
  return res.json(products.getProductById(parseInt(pid)))
})


app.listen(8080, () => { console.log('listening on port 8080 ...') })