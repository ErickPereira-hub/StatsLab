class Post {

    //This method inserts a new user in the database
    static async postRegistration(pool, name, email, password, category) {
        await pool.execute(`
        INSERT INTO users (name, email, password, category) VALUES
        (?, ?, ?, ?) 
            `, [name, email, password, category]);
    
    }

    static async postContactMessage(pool, subject, message, uid) {
        await pool.execute(`
        INSERT INTO contact_message (subject, message, uid) VALUES
        (?, ?, ?)
        `, [subject, message, uid]);
    }

}

module.exports = { Post }