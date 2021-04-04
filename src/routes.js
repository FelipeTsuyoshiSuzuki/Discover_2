const express = require('express')
const routes = express.Router()

// __diname = caminho absoluto do arquivo
const views = __dirname + "/views/"

const Profile = {
    data: {
        name: "Felipe Suzuki",
        avatar: "https://github.com/FelipeTsuyoshiSuzuki.png",
        "monthly-budget": 3000,
        "days-per-week": 3,
        "hours-per-day": 8,
        "vacation-per-year": 10,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },

        update(req, res) {
            const data = req.body

            // Numero de semanas do ano
            const totalWeeksPerYear = 52

            // Numero de semanas trabalhadas por mes
            const totalWeekPerMonth = (totalWeeksPerYear - data["vacation-per-year"]) / 12
        
            // Numero de horas por semana
            const totalHourPerWeek = data["hours-per-day"] * data["days-per-week"]

            // Numero de horas por mes
            const totalHourPerMonth = totalHourPerWeek * totalWeekPerMonth
        
            // Valor da hora
            data["value-hour"] = data["monthly-budget"] / totalHourPerMonth

            Profile.data = {
                ...data
            }

            return res.redirect("/profile")
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            "created_at": Date.now(),
        },
    
        {
            id: 2,
            name: "Onetwo Project",
            "daily-hours": 5,
            "total-hours": 50,
            "created_at": Date.now(),
        }    
    ],
    controllers: {
        index(req, res) {
            const updatedjobs = Job.data.map(job => {
            // Ajustando e atualizando job
            const remaining = Job.services.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
    
            // ...job == espalhamento, ou seja, esta espalhando(colocando) os dado do objeto
            return {
                ...job,
                remaining,
                status,
                budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
            }
        })
        
        return res.render(views + "index", { jobs: updatedjobs })
        },

        create(req, res) {
            return res.render(views + "job")   
        },

        save(req, res) {
            // Verificando ultimo id do array
            const lastId = Job.data[Job.data.length - 1]?.id || 0

            // colococando o job dentro de jobs[]
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            })

            // Redirecionando de volta para o index
            return res.redirect("/")
        },

        show(req, res) {
            // Puxando id do job da requisição
            const jobId = req.params.id

            // Verificando se há e qual é o job dentro do array
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job) {
                return res.send("job not found")
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            // Retornando a pagina do job
            return res.render(views + "job-edit", { job });
        },

        update(req, res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))
      
            if (!job) {
              return res.send('Job not found!')
            }
      
            // Atualizando informações do job
            const updatedJob = {
              ...job, 
              name: req.body.name,
              "total-hours": req.body["total-hours"], 
              "daily-hours": req.body["daily-hours"] 
            }
      
            // inserindo job atualizado de volta pro array
            Job.data = Job.data.map(job => {
              if(Number(job.id) === Number(jobId)) {
                job = updatedJob
              }
              
              return job
            })
      
            res.redirect('/job/' + jobId)
        },

        delete(req, res) {
            const jobId = req.params.id

            // Filtrando retirando o job
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            // Dia de criação do job
            const createdDate = new Date(job["created_at"])
            // Dia de entrega do job
            const dueDay = createdDate.getDate() + Number(remainingDays)
            // Setando o dia de entrega
            const dueDate = createdDate.setDate(dueDay)
        
            // Calculando a differença de tempo em Ms
            const timeDiff = dueDate - Date.now()
            // Calculando quantos Ms tem um dia
            const dayInMs = 1000 * 60 * 60 * 24
            // Convertendo Ms para dia
            const dayDiff = Math.floor(timeDiff / dayInMs)
        
            // Retornando os dias que restam
            return dayDiff
        },
        
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

// Fluxo request , response
// req == request, res == response
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

// Exportando as routas
module.exports = routes