require("mysql2/promise");

class UserDQL {

    constructor(pool) {
        this.pool = pool
    }

    async getUserInfo(email) {
        const [rows, fields] = await this.pool.execute("SELECT id, email, password FROM users WHERE email = ?", [email]);
        if ( rows.length === 0 ) {
            return undefined;
        } else {
            return {
                "id" : rows[0].id,
                "email" : rows[0].email,
                "password" : rows[0].password
            }
        }
    }

}

module.exports = { UserDQL }