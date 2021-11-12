const express = require('express');
const pokemonRouter = express.Router();
const {
  list_pokemons,
  one_pokemon,
  pokemon_info,
} = require("../controllers/pokemonController")
/* GET home page. */
pokemonRouter.get('/', list_pokemons);

pokemonRouter.get('/:id', one_pokemon);

pokemonRouter.get('/:id/:info', pokemon_info);




module.exports = pokemonRouter;
