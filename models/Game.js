const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        nameOfFighterOne: {type: String, min: 2, max: 50, required: true},
        nameOfFighterTwo: {type: String, min: 2, max: 50, required: true},
        winner:{ type: String, min: 2, max: 50, required: true },
        score: { type: Number, required:true },
    },
    { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;