const dotenv = require("dotenv");
const connectDB = require("./database");

dotenv.config();

const serverConfig = {
    PORT: Number(process.env.PORT) || 7777,
};

const dbConfig = {
    MONGODB_URI: process.env.MONGODB_URI,
};

module.exports = {
    serverConfig,
    dbConfig,
    connectDB,
};
