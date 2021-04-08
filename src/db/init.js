const Database = require("./config.js");

const initDb = {
    async init() {

const db = await Database();

await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    avatar TEXT, 
    monthly_budget INT, 
    days_per_week INT, 
    hours_per_day INT, 
    vacation_per_year INT, 
    value_hour INT
    )
`);

await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATATIME
    )
`);

await db.run(`INSERT INTO profile(
    name, 
    avatar, 
    monthly_budget, 
    days_per_week, 
    hours_per_day, 
    vacation_per_year, 
    value_hour
) VALUES (
    "Felipe",
    "https://github.com/FelipeTsuyoshiSuzuki.png",
    3000,
    3,
    8,
    10,
    75
    );
`)

await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizzaria Guloso",
    1,
    1,
    1617827420235
    );
`)

await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "OneTwo Project",
    5,
    45,
    1617827420235
    );
`)

await db.close();

    }
}

initDb.init()