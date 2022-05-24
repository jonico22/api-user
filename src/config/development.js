require("dotenv").config();

module.exports = {
    PORT: 8000,
    suprimirLogs: false,
    URL_SITE:'localhost',
    SEED: 'secretodedesarrollo',
    expiresIn: '24h',
    MONGO_URI: process.env.MONGO_URI
}