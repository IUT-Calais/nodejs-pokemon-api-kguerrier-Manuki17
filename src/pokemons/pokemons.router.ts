import { Router } from 'express';

import  { 
    getPokemonsCards,
    getPokemonId,
    createPokemon,
    updatePokemon,
    deletePokemon 
} from './pokemons.controller';

export const pokemonRouter = Router();

// --- Configuration des routes -----------------------------------
pokemonRouter.get('/', getPokemonsCards)

pokemonRouter.get('/:pokemonCardId', getPokemonId)

pokemonRouter.post('/', createPokemon) 

pokemonRouter.patch('/:pokemonCardId', updatePokemon) 

pokemonRouter.delete('/:pokemonCardId', deletePokemon)
// ----------------------------------------------------------------