const axios = require('axios')

const mergePokeData = async (id, pokemon) => {
  try {
    const { data: pokeApiData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    // mix the data of the pokemon you have, with the pictures from the api
    const mergedPokeData = {
      ...pokemon,
      pictures: {
        // back: pokeApiData?.sprites?.back_default, // null instead of breaking
        front: pokeApiData?.sprites?.front_default,
        // dream: pokeApiData?.sprites?.other?.dream_world?.front_default,
        official: pokeApiData?.sprites?.other['official-artwork']?.front_default
      }
    }
    return mergedPokeData
  } catch (e) {
    console.log(e.message)
    return pokemon
  }
  console.log(mergedPokeData)
  return mergedPokeData
}


module.exports = mergePokeData;