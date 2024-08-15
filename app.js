const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const authRoute = require("./routes/auth-route");
const connectDb = require("./config/db");

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 7000;

app.use('/api/v1/auth', authRoute)

app.listen(port, () => {
    console.log("server is running");
    connectDb();
})
