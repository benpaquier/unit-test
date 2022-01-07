const request = require("supertest")
const app = require("../../server")

describe('Heroes routes', () => {
  // test la route GET /heroes
  it('me renvoyer tous mes heros dans un tableau', async () => {
    // il faut qu'on fasse la requete
    const response = await request(app)
      .get('/heroes')
      
    // on vérifie que la réponse est un succes (status 200)
    expect(response.status).toBe(200)
    // on va verifier que la reponse c'est bien un tableau
    expect(Array.isArray(response.body)).toBe(true)
    // on va verifier que c'est un tableau d'objet
    expect(typeof response.body[0]).toBe("object")
  })

  // on teste la route GET /heroes/:id avec un id qui marche
  it('should send a specific hero according to its id', async () => {
    const id = 1

    const response = await request(app)
      .get(`/heroes/${id}`)

    expect(response.status).toBe(200)
    expect(typeof response.body).toBe("object")
    // je m'attends a ce que l'id du hero renvoyé
    // soit bien 1
    expect(response.body.id).toBe(id)
  })

  // on teste la route GET /heroes/:id avec un id qui n'existe pas
  it('should return an error if hero does not exist', async () => {
    const id = 3

    const response = await request(app)
      .get(`/heroes/${id}`)

    expect(response.status).toBe(404)
    expect(response.body.error).toBeDefined()
  })

  // on teste la route POST /heroes
  it('should create a hero', async () => {
    const response = await request(app)
      .post('/heroes')
      .send({
        name: "superman",
        age: 12
      })

    expect(response.status).toBe(200)
    expect(typeof response.body).toBe("object")
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBeDefined()
    expect(response.body.age).toBeDefined()
    // on peut aussi vérifier que la longeur du tableau de hero
    // a bien augmenté de 1
  })

  // on teste que ca renvoie une erreur si le hero il existe deja
  it('should fail if hero already exist', async () => {
    const response = await request(app)
      .post('/heroes')
      .send({
        name: "spiderman",
        age: 12
      })
    
    expect(response.status).toBe(409)
    expect(response.body.error).toBeDefined()
  })
})
