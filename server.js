const express = require("express");
const app = express();

const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');

const {MONGO_IP, MONGO_PORT,MONGO_PASSWORD,MONGO_USER} = require('./config/config');
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// connection to datbase
const mongoose = require('mongoose');
mongoose.connect(
    MONGO_URL)
    .then(() => {
        console.log("successfully connected to MongoDB")
    })
    .catch((err) => {
        console.log("Error Connecting to MongoDB")
    })
// to handle JSON
app.use(express.json());

app.get("/", (req,res) => {
    res.send("<h1> using express,nodemon,docker compose ! </h1>")
});

// API for task manager
app.use("/api/v1/tasks", taskRouter);
// API for user manager
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running at PORT: http://localhost:${PORT}`);
});
