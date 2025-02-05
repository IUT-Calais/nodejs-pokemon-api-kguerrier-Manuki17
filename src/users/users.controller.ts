import { Request, Response } from 'express';
import prisma from '../client';
import bcrypt from 'bcrypt'; // Crypter les mots de passe
import JWT from 'jsonwebtoken'; 


export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const emailUser = await prisma.user.findUnique({
            where: {email: String(email)}
        });


        if (emailUser) { 
            res.status(400).send(`L'adresse mail ${email} est déjà utilisée.`);
        }
    
        else if (email === undefined || password === undefined) {
            const missingFields = [];
            if (!email) missingFields.push('email');
            if (!password) missingFields.push('password');
            res.status(400).send(`Veuillez remplir les champs suivants: ${missingFields.join(', ')}`);
        }

        // Succès de la création.
        else{
            await prisma.user.create({
                data: {
                  email: email,
                  password: await bcrypt.hash(password, 10)
                }
              });
            res.status(201).send(`Utilisateur créé avec succès.`);
        }
         
    } catch (error) {
        res.status(404).send(`Erreur serveur : ${error}`);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const emailUser = await prisma.user.findUnique({
            where: {email: String(email)}
        });

        if (!emailUser) {
            res.status(400).send(`Adresse mail ${email} introuvable.`);
        }
    
        else if (email === undefined || password === undefined) {
            const missingFields = [];
            if (!email) missingFields.push('email');
            if (!password) missingFields.push('password');
            res.status(400).send(`Veuillez remplir les champs suivants: ${missingFields.join(', ')}`);
        }

        // Succès de la création.
        else{
            await prisma.user.create({
                data: {
                  email: email,
                  password: await bcrypt.hash(password, 10)
                }
              });
            res.status(201).send(`Utilisateur créé avec succès.`);
        }
         
    } catch (error) {
        res.status(404).send(`Erreur serveur : ${error}`);
    }
}