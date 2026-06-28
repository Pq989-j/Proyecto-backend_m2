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

        const token = jwt.sign({  id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"});
        return res.status(200).json({ mensaje: "Login correcto", 
            token
        });
        

    } catch (error){
        return res.status(500).json({ error: "Error interno del servidor al iniciar sesión" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.usuario.id).select("-password").populate("favMovies");
        if (!user) {
            return res.status(404).json({mensaje: "Usuario no encontrado"})
        }
        return res.json(user)
    }catch (error) {
        return res.status(500).json({ mensaje: "Error al obtener perfil"})
    }
};

export const deleteUser = async (req, res) => {
    const id = (req.usuario.id);
    try{
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: "Usuario no encontrada para borrar" });
        }
        return res.json({ mensaje: "Usuario eliminado correctamente", deleted });
    } catch (error) {
        return res.status(500).json({ error: "Error interno al borrar" });
    }
    
};

export const addFavoriteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const favMovie = await User.findByIdAndUpdate(
      req.usuario.id,
      {
        $addToSet: {
          favMovies: movieId
        }
      },
      { new: true }
    ).select("-password").populate("favMovies");
    if(!favMovie) {
        return res.status(404).json({ error: "Pelicula no encontrada para añadir" });

    }
    res.status(200).json(favMovie);
  } catch (error) {
    res.status(500).json({
      error: "Error interno al añadir pelicula"
    });
  }
};

export const deleteFavoriteMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const deleted = await User.findByIdAndUpdate(
            req.usuario.id,
            {
                $pull: {
                    favMovies: movieId
                }
            },
            { new: true }
        ).select("-password");
        if (!deleted) {
            return res.status(404).json({ error: "Pelicula favorita no encontrada para borrar" });
        }
        return res.json({ mensaje: "Pelicula favorita eliminada correctamente", deleted });
    } catch (error) {
        return res.status(500).json({ error: "Error interno al borrar" });
    }

};