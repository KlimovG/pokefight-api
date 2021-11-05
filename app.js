// require("dotenv").config();
// require("./database/client");

const express = require('express');
const path = require('path');
const cors = require('cors')

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const pokemonRouter = require('./routes/pokemons');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pokemons', pokemonRouter);



module.exports = app;
