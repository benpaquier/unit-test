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

const heroExists = (req, res, next) => {
  const { id } = req.params

  const hero = heroes.find(hero => hero.id === Number(id))

  if (!hero) {
    res.status(404).json({ error: "Hero not found" })
  } else {
    req.hero = hero
    next()
  }
}

const heroAlreadyExists = (req, res, next) => {
  const { name } = req.body

  const existingHero = heroes.find(hero => hero.name === name)

  if (existingHero) {
    res.status(409).json({ error: "Hero already exists" })
  } else {
    next()
  }
}

module.exports = {
  heroExists,
  heroAlreadyExists
}