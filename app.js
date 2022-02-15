require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went really wrong",
    });
})

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log("app start");
})