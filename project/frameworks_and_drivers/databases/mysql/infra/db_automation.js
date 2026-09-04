const db = require("mysql2/promise");

async function generateDatabase() {

    const wcnx = await db.createConnection({
        host : "localhost",
        user : "root",
        password : process.env.MYSQL_PASSWORD
    });

    //Creating the database
    await wcnx.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`);
    
    //Ending the weak connection
    await wcnx.end();
    
    //Creating a stronger connection
    const scnx = await db.createConnection({
        host : "localhost",
        user : "root",
        password : process.env.MYSQL_PASSWORD,
        database : process.env.DATABASE_NAME
    });

    //Creating the users table
    await scnx.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(1024) NOT NULL,
            category ENUM("student", "scientist", "enthusiast", "other"),
            created_at DATETIME DEFAULT NOW(),
            UNIQUE(email)
        )
    `);

    await scnx.execute(`
        CREATE TABLE IF NOT EXISTS contact_message (
            id INT PRIMARY KEY AUTO_INCREMENT,
            subject VARCHAR(50) NOT NULL,
            message VARCHAR(3000) NOT NULL,
            posted_at DATETIME DEFAULT NOW(),
            uid INT NOT NULL,
            FOREIGN KEY (uid) REFERENCES users(id)
        )
    `);

    //Closing the strong connection
    await scnx.end();
    console.log("Database check has been done");
}

module.exports = { generateDatabase }