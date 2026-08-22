class Post {

    //This method inserts a new user in the database
    static async postRegistration(pool, name, email, password, category) {
        await pool.execute(`
        INSERT INTO users (name, email, password, category) VALUES
        (?, ?, ?, ?) 
            `, [name, email, password, category]);
    
    }

}

module.exports = { Post }