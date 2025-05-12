/*
Autrice : Manon Chagot
Classe : BUT 2 APP
Année : 2025
*/
import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './jest.setup';

// --- Tests : "fetch all" ------------------------------------------
describe('User API', () => {
  describe('GET /users', () => {
      it('should fetch all Users', async () => {
        const mockUsers = [
          {
            id: 1,
            email: "manonchagot@iut.com",
            password: "truePassword"
          },
          {
            id: 2,
            email: "admin@admin.fr",
            password: "admin"
          }
        ];
  
        prismaMock.user.findMany.mockResolvedValue(mockUsers);
        const response = await request(app).get('/users');
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsers);
      });
    });
// ------------------------------------------------------------------

// --- Tests : "create a new User" ----------------------------------
  describe('POST /users', () => {
    it('should create a new User', async () => {
      const createdUser = {
        id: 1,
        email: "manonchagot@iut.com",
        password: "truePassword"
      };

      prismaMock.user.create.mockResolvedValue(createdUser);
      const response = await request(app).post('/users').send(createdUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual('Utilisateur créé avec succès.');
    });
  });
// ------------------------------------------------------------------

// --- Tests : "login a User" ---------------------------------------
  describe('POST /users/login', () => {
    it('should login a User', async () => {
      const loginUser = {
        id: 1,
        email: "manonchagot@iut.com",
        password: "truePassword"
      };

      prismaMock.user.findUnique.mockResolvedValue(loginUser);
      const response = await request(app).post('/users/login').send(loginUser);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({message: "Connexion réussie !", token: 'mockedToken' });
    });
  });
// ------------------------------------------------------------------
});
