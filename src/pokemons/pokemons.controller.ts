import { Request, Response } from 'express';
import prisma from '../client';


export const getPokemonsCards = async (_req: Request, res: Response) => {
    const pokemons = await.prisma.pokemonCard.findMany();
    res.status(200).send("Liste de tous les Pokémons.");
}

export const getPokemon = async (_req: Request, res: Response) => {
    const {pokemonCardId} = _req.params;
    res.status(200).send("Liste de tous les Pokémons.");
}

export const createPokemon = async (_req: Request, res: Response) => {
    res.status(201).send("Liste de tous les Pokémons.");
}

export const updatePokemon = async (_req: Request, res: Response) => {
    res.status(200).send("Liste de tous les Pokémons.");
}

export const deletePokemon = async (_req: Request, res: Response) => {
    res.status(204).send("Liste de tous les Pokémons.");
}