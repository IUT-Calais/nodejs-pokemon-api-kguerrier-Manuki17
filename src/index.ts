/* 
 _   _           _          ___ _____  ______     _                              
| \ | |         | |        |_  /  ___| | ___ \   | |                             
|  \| | ___   __| | ___      | \ `--.  | |_/ /__ | | _____ _ __ ___   ___  _ __  
| . ` |/ _ \ / _` |/ _ \     | |`--. \ |  __/ _ \| |/ / _ \ '_ ` _ \ / _ \| '_ \ 
| |\  | (_) | (_| |  __/ /\__/ /\__/ / | | | (_) |   <  __/ | | | | | (_) | | | |
\_| \_/\___/ \__,_|\___| \____/\____/  \_|  \___/|_|\_\___|_| |_| |_|\___/|_| |_| 

Autrice : Chagot Manon
Classe : BUT 2 Apprenti
Année : 2025
*/
import express from 'express';
import { pokemonRouter } from './pokemons/pokemons.router';
import { userRouter } from './users/users.router';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

// --- Configuration des routes -----------------------------------
app.use('/pokemon-cards', pokemonRouter); 
app.use('/users', userRouter);
// ----------------------------------------------------------------
