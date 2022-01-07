const express = require("express")
const app = express()

const { heroExists, heroAlreadyExists } = require("../middlewares/heroes")

let heroes = [
  {
    id: 1, 
    name: "spiderman",
    age: 2
  },
  {
    id: 2,
    name: "batman",
    age: 20
  }
]

app.get('/', (req, res) => {
  res.json(heroes)
})

app.get('/:id', heroExists, (req, res) => {
  res.json(req.hero)
})

app.post('/', heroAlreadyExists, (req, res) => {  
  const newHero = {
    id: heroes.length + 1,
    ...req.body
  }

  heroes = [ ...heroes, newHero ]

  res.json(newHero)
})

module.exports = app