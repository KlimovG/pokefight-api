const express = require('express');
const pokemonRouter = express.Router();
const Game = require('../models/Game');

const {
  list_pokemons,
  one_pokemon,
  pokemon_info,
  leaderboard,
  game
} = require("../controllers/pokemonController")
/* GET home page. */
pokemonRouter.get('/page/:id', list_pokemons);

pokemonRouter.get('/:id', one_pokemon);

pokemonRouter.get('/game/leaderboard', leaderboard);

pokemonRouter.post('/game/save', game);

pokemonRouter.get('/:id/:info', pokemon_info);





module.exports = pokemonRouter;
