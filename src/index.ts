import express from 'express';
import { pokemonsRouter, pokemonRouter } from './pokemons/pokemons.router';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

// --- Configuration des routes -----------------------------------
app.use('/pokemons-cards', pokemonsRouter);
app.use('/pokemon-cards', pokemonRouter);











// app.post('/pokemon-cards', (_req: Request, res: Response) => {
//   res.status(201).send(`Pokémon enregistré.`);
// })

// app.patch('/pokemon-cards/:pokemonCardId', (_req: Request, res: Response) => {
//   res.status(200).send(`Le Pokémon ${_req.params.pokemonCardId} a été mis à jour.`);
// })

// app.delete('/pokemon-cards/:pokemonCardId', (_req: Request, res: Response) => {
//   res.status(204).send(`Le Pokémon ${_req.params.pokemonCardId} a été supprimé.`);
// })

// ----------------------------------------------------------------












// app.use('/users', userRouter);

// app.listen(port, () => {
//   console.log('Le serveur démarre sur le port $(port)');
// });

// app.get('/users', (_req: Request, res: Response) => {
//   res.status(200).send('Liste des utilisateurs');
// });

