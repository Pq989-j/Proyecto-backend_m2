import bcrypt from "bcryptjs";
import User from "../models/user_model.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        const userExists = await User.findOne({email});
        if (userExists){
            return res.status(409).json({ mensaje: "Este email ya ha sido registrado"});
        }


        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({email, password: hash});

        return res.status(201).json({ id: newUser._id, email: newUser.email});

    } catch (error){
        return res.status(500).json({ error: "Error interno del servidor al registrar usuario" });
    }
};

export const login = async (req,res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas"});
        }

        const coincide = await bcrypt.compare(password, user.password);
        if(!coincide) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas"});
        }

        const token = jwt.sign({  id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ mensaje: "Login correcto", 
            token
        });

    } catch (error){
        return res.status(500).json({ error: "Error interno del servidor al iniciar sesión" });
    }
};

export const whoAmI = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ mensaje: "No hay token" });
        }

        const token = authHeader.split(" ")[1];

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        res.status(200).json({ mensaje: "Token válido", id: verifyToken.id });

    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
};