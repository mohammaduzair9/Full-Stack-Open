require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('postdata', (request) => {
  if(request.method === 'POST'){
    return JSON.stringify(request.body)
  }
  else{
    return null
  }
})
  
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :postdata')
);

let persons = [
]

// GET Methods //

app.get('/api/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// POST Methods //

app.post('/api/persons/', (request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
  if(persons.find(person => person.name === body.name)){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(person)
  })
})


// DELETE Methods //

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
