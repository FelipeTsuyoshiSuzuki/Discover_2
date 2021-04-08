const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
    create(req, res) {
        return res.render("job");
    },

    async save(req, res) {
        // colococando o job dentro de jobs[]
        await Job.create(
            {
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now(),
            }
        );

        

        // Redirecionando de volta para o index
        return res.redirect("/");
    },

    async show(req, res) {
        // Puxando id do job da requisição
        const jobId = req.params.id;
        const jobs = await Job.get();
        const profile = await Profile.get();

        // Verificando se há e qual é o job dentro do array
        const job = jobs.find((job) => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send("job not found");
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

        // Retornando a pagina do job
        return res.render("job-edit", { job });
    },

    async update(req, res) {
        const jobId = req.params.id;

        // Atualizando informações do job
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        };

        await Job.update(updatedJob, jobId);

        res.redirect("/job/" + jobId);
    },

    async delete(req, res) {
        const jobId = req.params.id;

        await Job.delete(jobId);

        return res.redirect("/");
    },
};
