import { Router } from 'express';

import  { 
    getPokemonsCards,
    getPokemon,
    createPokemon,
    updatePokemon,
    deletePokemon 
} from './pokemons.controller';


export const pokemonsRouter = Router();
export const pokemonRouter = Router();

pokemonsRouter.get('/', getPokemonsCards)

pokemonsRouter.get('/:productID', getPokemon)

pokemonRouter.post('/', createPokemon) 

pokemonRouter.put('/:productID', updatePokemon) 

pokemonRouter.delete('/:productID', deletePokemon)

module.exports = pokemonsRouter