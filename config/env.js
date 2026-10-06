const dotenv = require("dotenv");
dotenv.config();

const requiredEnvVariables = ["NODE_ENV", "DB_URL", "PORT"];

for (const envVariable of requiredEnvVariables) {
    if(!process.env[envVariable]){
        throw new Error(`Missing required environment variable: ${envVariable}`);
    }
}

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8080;

module.exports = {
    DB_URL,
    PORT,
}