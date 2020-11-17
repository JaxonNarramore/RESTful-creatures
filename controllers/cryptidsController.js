const fs = require('fs')

const cryptidRouter = require('express').Router()

cryptidRouter.get('/', (req, res) => {
  const rawCryptids = fs.readFileSync('./cryptids.json')
  const cryptids = JSON.parse(rawCryptids)
  
  res.render('cryptids/index', { cryptids })
})

// new has to be above show, or else it will think that 'new' is an id value
cryptidRouter.get('/new', (req, res) => {
  res.render('cryptids/new')
})

cryptidRouter.get('/:id', (req, res) => {
  const rawCryptids = fs.readFileSync('./cryptids.json')
  const cryptids = JSON.parse(rawCryptids)
  const id = parseInt(req.params.id) - 1
  const cryptid = cryptids[id]

  res.render('cryptids/show', { cryptid })
})

cryptidRouter.post('/', (req, res) => {
  const newCryptid = req.body
  const rawCryptids = fs.readFileSync('./cryptids.json')
  const cryptids = JSON.parse(rawCryptids)
  cryptids.push(newCryptid)

  fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))

  res.redirect('/cryptids')
})

module.exports = cryptidRouter;