const bcrypt = require("bcryptjs");

const User = require("../models/user_model");

const register = async (req, res) => {
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

const login = async (req,res) => {
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
        return res.status(200).json({ mensaje: "Login correcto", 
            id: user._id, 
            email: user.email
        });

    } catch (error){
        return res.status(500).json({ error: "Error interno del servidor al iniciar sesión" });
    }
};
module.exports = {
    register,
    login 
};