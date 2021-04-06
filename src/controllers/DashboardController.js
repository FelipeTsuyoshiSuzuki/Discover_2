const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profile")

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
    
        let jobTotalHours = 0

        const updatedjobs = jobs.map((job) => {
            // Ajustando e atualizando job
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress";
    
            // Atualizando numero se status
            statusCount[status] += 1

            // Atualizanod horas para trabalhar em um dia
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours
            // ...job == espalhamento, ou seja, esta espalhando(colocando) os dado do objeto
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"]),
            };
        });
    
        // Horas de trabalho livres
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render("index", { jobs: updatedjobs, profile, statusCount, freeHours });
    }
}