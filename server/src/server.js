require('dotenv/config');
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

//Middleware
app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require('./routes/clientRoutes'));
app.use(require('./routes/userRoutes'));

app.listen(port, () => {
    console.log('Server iniciado na porta' + port);
});