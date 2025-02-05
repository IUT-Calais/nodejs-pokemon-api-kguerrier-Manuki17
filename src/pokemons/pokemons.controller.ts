import { Request, Response } from 'express';
import prisma from '../client';


export const getPokemonsCards = async (_req: Request, res: Response) => {
    const pokemons = await prisma.pokemonCard.findMany();
    try {
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(404).send(`Pokémons non trouvés : ${error}`);
    }  
}

export const getPokemonId = async (req: Request, res: Response) => {
    const { pokemonCardId } = req.params;
    try {
        const pokemon = await prisma.pokemonCard.findUnique({
            where: {id: Number(pokemonCardId)}
        });

        if (!pokemon){
            res.status(404).send(`Pokémon ${pokemonCardId} non trouvé.`);
        }

        // Succès de la recherche.
        else{
            res.status(200).json(pokemon);
        }
        
    } catch (error) {
        res.status(404).send(`Erreur serveur : ${error}`);
    }
}

export const createPokemon = async (req: Request, res: Response) => {
    const { name, pokedexId, type, lifePoints, size, weight, imageUrl} = req.body;
    try {
        const pokemonName = await prisma.pokemonCard.findUnique({
            where: {name: String(name)}
        });

        const pokeId = await prisma.pokemonCard.findUnique({
            where: {pokedexId: Number(pokedexId)}
        });

        const pokemonType = await prisma.type.findUnique({
            where: {id: Number(type)}
        });


        if (pokemonName) { 
            res.status(400).send(`Le Pokémon ${name} existe déjà.`);
        }

        else if (pokeId) { 
            res.status(400).send(`Le Pokémon ${pokedexId} existe déjà.`);
        }

        else if (pokemonType === null) {
            res.status(400).send(`Le type ${type} n'existe pas.`);
        }
    
        else if (pokemonName === undefined || pokeId === undefined || pokemonType === undefined || lifePoints === undefined) {
            const missingFields = [];
            if (!pokemonName) missingFields.push('name');
            if (!pokeId) missingFields.push('pokedexId');
            if (!pokemonType) missingFields.push('type');
            if (!lifePoints) missingFields.push('lifePoints');
            res.status(400).send(`Veuillez remplir les champs suivants: ${missingFields.join(', ')}`);
        }

        // Succès de la création.
        else{
            await prisma.pokemonCard.create({
                data: {
                  name: name,
                  pokedexId: pokedexId,
                  type: { connect : {id : type} },
                  lifePoints: lifePoints,
                  size: size,
                  weight: weight,
                  imageUrl: imageUrl
                }
              });
            res.status(201).send(`Pokémon ${name} créé avec succès.`);
        }
         
    } catch (error) {
        res.status(404).send(`Erreur serveur : ${error}`);
    }
}

export const updatePokemon = async (req: Request, res: Response) => {
    const { pokemonCardId } = req.params;
    const { name, pokedexId, type, lifePoints, size, weight, imageUrl} = req.body;
    let pokemonType = null;
    try {
        const pokemonName = await prisma.pokemonCard.findUnique({
            where: {name: String(name)}
        });

        const pokeId = await prisma.pokemonCard.findUnique({
            where: {pokedexId: Number(pokedexId)}
        });

        if (type != undefined) {
            pokemonType = await prisma.type.findUnique({
                where: {id: Number(type)}
            });
        }
    
        else if (pokemonName) { 
            res.status(400).send(`Le Pokémon ${name} existe déjà.`);
        }

        else if (pokeId) { 
            res.status(400).send(`Le Pokémon ${pokedexId} existe déjà.`);
        }

        else if (pokemonType) {
            res.status(400).send(`Le type ${type} n'existe pas.`);
        }

        // Succès de l'update.
        else{
            await prisma.pokemonCard.update({
                where: {id: Number(pokemonCardId)},
                data: {
                    name: name,
                    pokedexId: pokedexId,
                    type: { connect : {id : type} },
                    lifePoints: lifePoints,
                    size: size,
                    weight: weight,
                    imageUrl: imageUrl
                }
            });
            res.status(200).send(`Pokémon ${pokemonCardId} mis à jour avec succès.`);
        }
         
    } catch (error) {
        res.status(404).send(`Erreur serveur : ${error}`);
    }
}

export const deletePokemon = async (req: Request, res: Response) => {
    const { pokemonCardId } = req.params;
    try {
        const pokemon = await prisma.pokemonCard.delete({
            where: {id: Number(pokemonCardId)}
        });
        
        res.status(204).send(`Pokémon ${pokemonCardId} supprimé : ${pokemon?.name}`);

    } catch (error) {
        res.status(404).send(`Pokémon ${pokemonCardId} non trouvé.`);
    }
}