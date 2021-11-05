// const User = require("../models/User");
const pokemonDB = require("../pokefight.json");

const list_pokemons = async (req, res) => {
  try {
    // const users = await User.find();
    res.json(pokemonDB);
  } catch (e) {
    res.status(500).send(e);

  };
}
const one_pokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const onePokemon = pokemonDB.find(pokemon => pokemon.id === +id);
    res.json(onePokemon);
  } catch (e) {
    res.status(500).send(e);
  }
};

const pokemon_info = async (req, res) => {
  const { id, info } = req.params;
  console.log(req.params)
  try {
    const onePokemon = pokemonDB.find(pokemon => pokemon.id === +id);
    const foundedKey = Object.keys(onePokemon).find(key => key === info);
    res.json(onePokemon[foundedKey]);
  } catch (e) {
    res.status(500).send(e);
  }
};


module.exports = {
  list_pokemons,
  one_pokemon,
  pokemon_info
};