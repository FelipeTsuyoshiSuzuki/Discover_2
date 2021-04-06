module.exports = {
    remainingDays(job) {
        const remainingDays = (
            job["total-hours"] / job["daily-hours"]
        ).toFixed();
        // Dia de criação do job
        const createdDate = new Date(job["created_at"]);
        // Dia de entrega do job
        const dueDay = createdDate.getDate() + Number(remainingDays);
        // Setando o dia de entrega
        const dueDate = createdDate.setDate(dueDay);

        // Calculando a differença de tempo em Ms
        const timeDiff = dueDate - Date.now();
        // Calculando quantos Ms tem um dia
        const dayInMs = 1000 * 60 * 60 * 24;
        // Convertendo Ms para dia
        const dayDiff = Math.floor(timeDiff / dayInMs);

        // Retornando os dias que restam
        return dayDiff;
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
};
