const config = require('./config/config');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quote', require('./routes/quoteRoutes'));

app.use((err, req, res, next) => {
	console.log(err.stack);
	console.log(err.name);
	console.log(err.code);
	res.status(500).json({ message: 'Something went wrong from backend' });
});

app.listen(config.port, config.host, () => {
	console.log(`quotations-app start on HOST: ${config.host} and PORT: ${config.port}`);
});
