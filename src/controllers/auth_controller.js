const bcrypt = require("bcryptjs");

const user = require("../models/user_model");

const register = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        const userExists = await user.findOne({email});
        if (userExists){
            return res.status(409).json({ mensaje: "Este email ya ha sido registrado"});
        }


        const hash = await bcrypt.hash(password, 10);
        const newUser = await user.create({email, password: hash});

        return res.status(201).json({ id: newUser._id, email: newUser.email});

    } catch (error){
        return res.status(500).json({ error: "Error interno del servidor al registrar usuario" });
    }
};

module.exports = {register};