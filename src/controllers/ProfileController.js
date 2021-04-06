const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() })
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

        Profile.update({
            ...Profile.get(),
            ...data
        })

        return res.redirect("/profile")
    }
}