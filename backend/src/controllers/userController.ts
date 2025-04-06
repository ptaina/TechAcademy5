import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { Op } from "sequelize";
import { JwtPayload } from "../types/jwtPayload";


export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll({
            attributes: { exclude: ["password"] } 
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id, {
            attributes: { exclude: ["password"] }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, cpf, password } = req.body;

        if (!name || !email || !cpf || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        
        if (!/^\d{11}$/.test(cpf)) {
            return res.status(400).json({ error: "Invalid CPF format" });
        }

        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                error: "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter and one number"
            });
        }

        
        const existingUser = await UserModel.findOne({ where: { [Op.or]: [{ email }, { cpf }] } });
        if (existingUser) {
            return res.status(400).json({ error: "Email or CPF already registered" });
        }

        const user = await UserModel.create({ name, email, cpf, password });
        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, password } = req.body;
        const loggedUser = req.user as JwtPayload; 

       
        if (parseInt(id) !== loggedUser.id) {
            return res.status(403).json({ error: "You can only update your own profile" });
        }

       
        if (password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ 
                    error: "Password must contain at least 8 characters, including one uppercase, one lowercase and one number"
                });
            }
        }

      
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

      
        const updates: Partial<UserModel> = {};
        if (name) updates.name = name;
        if (password) updates.password = password;
        updates.updatedBy = loggedUser.id;

       
        await UserModel.update(updates, { where: { id } });
        const updatedUser = await UserModel.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        return res.status(200).json({ 
            message: "User updated successfully", 
            user: updatedUser 
        });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const destroyUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};




















