const express = require("express")
const server = express()
// Importando as rotas do routes.js
const routes = require('./routes')

// Iniciando template engine
server.set('view engine', 'ejs')

// Usando a pasta estatica public
server.use(express.static("public"))

// Liberando o uso do req.body
server.use(express.urlencoded({ extended: true }))

// Usando as routas
server.use(routes)

// Criando servidor
server.listen(3000, () => console.log("Rodando"))