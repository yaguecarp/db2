const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;


    if (!token) return res.status(403).json({ status: "No token provided" });

    const tokenDecoded = jwt.verify(token, "palabraSecreta");
    console.log("CUIL USUARIO", tokenDecoded.user.cuil);

    const user = await Usuario.findById(tokenDecoded.user._id);
    if (!user) return res.status(404).json({ status: "No user found" });

    
    next();
  } catch (error) {
    return res.status(401).json({message: "Unauthorized"})
  }
};

module.exports = verifyToken;
