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


// --- Récupération d'un utilisateur par son ID ----------------------
export const getUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {id: Number(userId)}
        });

        // Pokémon non trouvé.
        if (user === null){
            res.status(404).json(`Utilisateur ${userId} non trouvé.`);
        }

        // Succès de la recherche.
        else{
            res.status(200).json(user);
        }
        
    } catch (error) {
        res.status(500).send(`Erreur serveur : ${error}`);
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

        // Vérifier le format e-mail.
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(email)) {
            res.status(400).json(`Format d'email invalide.`);
        }

        else if (emailUser) { 
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
            
            // Succès de la connexion.
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

// --- Mettre à jour un utilisateur -------------------------------------
export const updateUser = async (req: Request|any, res: Response|any) => {
    const { userId } = req.params;
    const { email, password } = req.body;
    try {

        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) }
        });

        if (!user) {
            return res.status(404).json(`Utilisateur ${userId} non trouvé.`);
        }

        // On prépare les données à passer.
        const data: any = {};
        if (email !== undefined) data.email= email;

        // Vérifier le format e-mail.
        else if (email !== undefined) {
            const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailFormat.test(email)) {
                res.status(400).json(`Format d'email invalide.`);
            }

            // Vérifier si le nouvel email n'est pas déjà utilisé.
            const emailExists = await prisma.user.findUnique({
                where: { email: String(email) }
            });

            if (emailExists && emailExists.id !== Number(userId)) {
                res.status(400).json(`L'adresse mail ${email} est déjà utilisée.`);
            }

            data.email = email;
        }

        // Succès de l'update.
        await prisma.user.update({
            where: { id: Number(userId) },
            data: data
        });
        res.status(200).json(`Utilisateur ${userId} mis à jour avec succès.`);
        
    } catch (error) {
        res.status(500).send(`Erreur serveur : ${error}`);
    }
}
// ------------------------------------------------------------------

// --- Supprimer un utilisateur -----------------------------------------
export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {id: Number(userId)}
        });

        // Utilisateur non trouvé.
        if (user === null){
            res.status(404).json(`Utilisateur ${userId} non trouvé.`);
        }

        // Succès de la suppression.
        else{
            await prisma.user.delete({
                where: { id: Number(userId) }
            });
            res.status(204).send();
        }

    } catch (error) {
        res.status(500).send(`Erreur serveur : ${error}`);
    }
}
// ------------------------------------------------------------------