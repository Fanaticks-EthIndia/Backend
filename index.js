const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./connection");
const cors = require('cors');

const eventsRoute = require("./routes/events");

const app = express();
const PORT = 8000;
const dbConnected = false;
connectToMongoDB('mongodb+srv://fanaticks:fanaticks@cluster0.4umhp0j.mongodb.net/').then(() =>
    console.log("Mongodb connected")
)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/events", eventsRoute);



app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));