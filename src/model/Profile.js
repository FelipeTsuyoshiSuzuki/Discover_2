let data = {
    name: "Felipe Suzuki",
    avatar: "https://github.com/FelipeTsuyoshiSuzuki.png",
    "monthly-budget": 3000,
    "days-per-week": 3,
    "hours-per-day": 8,
    "vacation-per-year": 10,
    "value-hour": 75
}

module.exports = {
    get() {
        return data
    },

    update(newData) {
        data = newData
    }
}