/*
Autrice : Manon Chagot
Classe : BUT 2 APP
Année : 2025
*/
import { Request, Response } from 'express';
import prisma from '../client';
import bcrypt from 'bcrypt'; // Crypter les mots de passe
import jwt from 'jsonwebtoken'; 


// --- Récupération de tous les utilisateurs -------------------------
export const getUsers = async(_req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    try{
        res.status(200).json(users);
    } catch (error) {
        res.status(404).send(`Utilisateurs non trouvés : ${error}`);
    }
}
// ------------------------------------------------------------------

// --- Création d'un utilisateur ------------------------------------
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
            res.status(201).json(`Utilisateur créé avec succès.`);
        }
         
    } catch (error) {
        res.status(404).send(`Erreur serveur : ${error}`);
    }
}
// ------------------------------------------------------------------

// --- Connecter un utilisateur avec email et mot de passe ---------- 
export const loginUser = async (req: Request|any, res: Response|any) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {email: String(email)}
        });

        if (!user) {
            res.status(400).send(`Adresse mail ${email} introuvable.`);
        }
    
        else if (email === undefined || password === undefined) {
            const missingFields = [];
            if (!email) missingFields.push('email');
            if (!password) missingFields.push('password');
            res.status(400).send(`Veuillez remplir les champs suivants: ${missingFields.join(', ')}`);
        }
        else{
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(400).send('Mot de passe invalide.');
            } 
            
            // Succès de la connexion
            else {
                const token = jwt.sign(
                    { email: email }, // Payload
                    process.env.JWT_SECRET as jwt.Secret, // Secret
                    { expiresIn: "1d" } // Expiration"
                );

                res.status(200).json({
                    message: "Connexion réussie !",
                    token,
                });
            }
        }

    } catch (error) {
        res.status(404).send(`Erreur serveur : ${error}`);
    }
}
// ------------------------------------------------------------------