// const User = require("../models/User");
// const { map } = require("../app");
const pokemonDB = require("../pokefight.json");
const pokeapiDB = require("../pokeapi.json");
const findColor = require('../utilities/colors');
const mergePokeData = require('../utilities/mergePokeData');
const Game = require('../models/Game');


const axios = require('axios');

const list_pokemons = async (req, res) => {
  try {
    // Step 1: iterate over the pokemons array (any kind of loop)
    // Step 2: for each pokemon, pass it to the findColor function
    // Step 3: attach the returned value to your pokemon instance as a new property to the object

    // Example 1: with a map
    const pokemonsWithColors = pokemonDB.map(pk => {
      const color = findColor(pk)
      pk.color = color
      return pk
    })

    const pokemonPromises = pokemonsWithColors.slice(0,20).map(pk => mergePokeData(pk.id, pk))
    // .slice(0, 20)

    const mergedPokemonsData = await Promise.all(pokemonPromises)

    res.json(mergedPokemonsData)
    // res.json(pokemonsWithColors);

  //  const newpokeDB = pokemonDB.map(async pokemon => {
  //   const result= await axios.get(`https://pokeapi.co/api/v2/${pokemon.id}`)
  //  return result
  //  })
  //  console.log(newpokeDB);
  } catch (e) {
    res.status(500).send(e);
  };
}

const one_pokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const onePokemon = pokemonDB.find(pokemon => pokemon.id === +id);

    if(!onePokemon){
      return res.sendStatus(404);
    }

    const color = findColor(onePokemon)
    onePokemon.color = color;

    const pokeData = await mergePokeData(id, onePokemon)

    res.json(pokeData);
  } catch (e) {
    console.log(e.message)
    res.status(500).send(e.message);
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

const leaderboard = async (req, res) => {
  console.log(req.id);
  try{
    const games = await Game.find();

        res.json(games);

  }catch(e){
    res.status(500).send(e.message);
  }
};

const game = async (req, res) =>{
  
  const { nameOfFighterOne,nameOfFighterTwo, winner, score} = req.body;
  console.log(req.body);
  try{
        const newGame = await Game.create({
          nameOfFighterOne,
          nameOfFighterTwo,
          winner,
          score
        });
        res.json(newGame);
  }catch(e){
    res.status(500).send(e.message);
  }
};

module.exports = {
  list_pokemons,
  one_pokemon,
  pokemon_info,
  leaderboard,
  game
};