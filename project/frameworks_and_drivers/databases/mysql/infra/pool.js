const db = require("mysql2/promise");

const pool = db.createPool({
    host : "localhost",
    user : "root",
    password : process.env.MYSQL_PASSWORD,
    connectionLimit : Number(process.env.POOL_LIMIT),
    database : process.env.DATABASE_NAME,
    waitForConnection : true,
    queueLimit : 0,
    idleTimeout : Number(process.env.CONNECTION_TTL_IN_MS)
}); //<--- Pool of connection used to handle connections to the database.

module.exports = { pool }