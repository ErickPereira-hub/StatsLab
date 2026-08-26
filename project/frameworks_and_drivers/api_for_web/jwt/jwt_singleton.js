const jwt = require("./jwt_cycle");

const JWT_SINGLETON = new jwt.jwtCycle();

module.exports = { JWT_SINGLETON };