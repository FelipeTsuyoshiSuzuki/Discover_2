const express = require('express')
const routes = express.Router()

// __diname = caminho absoluto do arquivo
const views = __dirname + /views/

const profile = {
    name: "Felipe Suzuki",
    avatar: "https://avatars.githubusercontent.com/u/73393087?v=4",
    "monthly-budget": 3000,
    "days-per-week": 3,
    "hours-per-day": 8,
    "vacation-per-year": 10
}

// Fluxo request , response
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))

// Exportando as routas
module.exports = routes