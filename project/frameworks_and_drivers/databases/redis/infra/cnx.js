const {createClient} = require("redis");

let client; //<--- This variable will be used as the singleton

async function redisCnx() {

    if (client !== undefined) {
        return client;
    }

    client = createClient({
        url : "redis://localhost:6379"
    });
        
    await client.connect() //<--- Stabilishing the connection

    return client;

}

module.exports = {redisCnx}