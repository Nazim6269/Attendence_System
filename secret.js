require("dotenv").config();

const serverPort = process.env.SERVER_PORT;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const dbURL = process.env.MONGO_URL;

module.exports = { jwtSecretKey, serverPort, dbURL };
