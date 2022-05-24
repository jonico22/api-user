require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    suprimirLogs: false,
    URL_SITE:'localhost',
    SEED: 'secretodetest',
    expiresIn: '24h',
    MONGO_URI: process.env.MONGO_URI
}