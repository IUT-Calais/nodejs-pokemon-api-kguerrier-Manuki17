import express from 'express';
import { pokemonRouter } from './pokemons/pokemons.router';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

// --- Configuration des routes -----------------------------------
app.use('/pokemon-cards', pokemonRouter); 
// ----------------------------------------------------------------
