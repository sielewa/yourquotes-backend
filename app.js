require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/quotations", require("./routes/quotationsRoutes"));

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

app.listen(process.env.PORT, () => {
    console.log(`app start on PORT ${process.env.PORT}`);
})