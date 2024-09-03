const { response }  = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async ( req, res = response, next) => {

  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({
      ok:false,
      msg: 'No se recibió el token',
    });
  }

  try {
    
    const { uid, name } = await jwt.verify( token, process.env.SECRET_JWT_SEED );

    req.uid = uid;
    req.name = name;

  } catch (error) {

    console.log(error);
    return res.status(401).json({
      ok:false,
      msg: 'Error: Token no válido ',
    });    

  }

  next();

}

module.exports = {
  validateJWT
}
  