import request from 'supertest';
import { app, stopServer } from '../src';
import { prismaMock } from './jest.setup';

afterAll(() => {
  stopServer();
});

describe('PokemonCard API', () => {
  describe('GET /pokemon-cards', () => {
    it('should fetch all PokemonCards', async () => {
      const mockPokemonCards = [
        {
          id: 1,
          name: "Pikachu",
          pokedexId: 25,
          typeId: 1,
          imageUrl: 'pikachu.png',
          lifePoints: 60,
          weight: 85,
          size: 6,
        },
        {
          id: 2,
          name: "Evoli",
          pokedexId: 133,
          typeId: 2,
          imageUrl: 'evoli.png',
          lifePoints: 70,
          weight: 65,
          size: 7,
        }
      ];

      prismaMock.pokemonCard.findMany.mockResolvedValue(mockPokemonCards);
      const response = await request(app).get('/pokemon-cards');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPokemonCards);
    });
  });

  describe('GET /pokemon-cards/:pokemonCardId', () => {
    it('should fetch a PokemonCard by ID', async () => {
      const mockPokemonCard = {
          id: 1,
          name: "Pikachu",
          pokedexId: 25,
          typeId: 1,
          imageUrl: 'pikachu.png',
          lifePoints: 60,
          weight: 85,
          size: 6,
      };

      prismaMock.pokemonCard.findUnique.mockResolvedValue(mockPokemonCard);
      const response = await request(app).get('/pokemon-cards/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPokemonCard);
    });

    it('should return 404 if PokemonCard is not found', async () => {
      const response = await request(app).get('/pokemon-cards/173');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'PokemonCard not found' });
    });
  });

//   describe('POST /pokemon-cards', () => {
//     it('should create a new PokemonCard', async () => {
//       const createdPokemonCard = {};

//       expect(response.status).toBe(201);
//       expect(response.body).toEqual(createdPokemonCard);
//     });
//   });

//   describe('PATCH /pokemon-cards/:pokemonCardId', () => {
//     it('should update an existing PokemonCard', async () => {
//       const updatedPokemonCard = {};

//       expect(response.status).toBe(200);
//       expect(response.body).toEqual(updatedPokemonCard);
//     });
//   });

//   describe('DELETE /pokemon-cards/:pokemonCardId', () => {
//     it('should delete a PokemonCard', async () => {
//       expect(response.status).toBe(204);
//     });
//   });
});
