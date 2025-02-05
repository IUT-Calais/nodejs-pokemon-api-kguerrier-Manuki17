import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient();

async function main() {
  // Suppression de tous les posts
  await prisma.pokemonCard.deleteMany();
  await prisma.user.deleteMany();
  await prisma.type.deleteMany();

  // Création de plusieurs types avec createMany
  await prisma.type.createMany({
    data: [
      { name: 'Normal' },
      { name: 'Fire' },
      { name: 'Water' },
      { name: 'Grass' },
      { name: 'Electric' },
      { name: 'Ice' },
      { name: 'Fighting' },
      { name: 'Poison' },
      { name: 'Ground' },
      { name: 'Flying' },
      { name: 'Psychic' },
      { name: 'Bug' },
      { name: 'Rock' },
      { name: 'Ghost' },
      { name: 'Dragon' },
      { name: 'Dark' },
      { name: 'Steel' },
      { name: 'Fairy' },
    ],
  });

  // Création d'un Pokémon avec create
  await prisma.pokemonCard.create({
    data: {
      name:"Bulbizarre",
      pokedexId:1,
      type: { connect : {id : 3} }, // Référence à l'id de la table types
      lifePoints:45,
      size:0.7,
      weight:6.9,
      imageUrl:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
    }
  });

  // Création du User Admin
  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: "admin"
    }
  })

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
