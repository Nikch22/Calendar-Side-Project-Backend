const { request, response }  = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/User');



const renewToken = async ( req = request, res = response) => {
  console.log('Renovando Token');

  const { uid, name } = req;

  // Generar Nuevo JWT
  const token = await generateJWT( uid, name );

  res.json({
    ok:true,
    token
  })
  
}

  const createUser = async ( req, res = response) => {

  console.log('Registrando usuario');

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if ( user ) {
      return res.status(400).json({
        ok:false,
        msg:'Ese correo ya se encuentra registrado',
      })
    }

    user = new User( req.body );

    //Password Encrypt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt);

    await user.save();     

    // Generar JWT
    const token = await generateJWT( user.id, user.name );

    res.status(201).json({
      ok:true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      ok:false,
      msg:'Por favor hablar con el administrador',
    })
  }


  
}

const loginUser = async( req, res = response) => {

  console.log('Logueando usuario');

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if ( !user ) {
      return res.status(400).json({
        ok:false,
        msg:'Ese correo no está registrado',
      })
    }

    //Password Compare
    const isValidPassword = bcrypt.compareSync( password, user.password);

    if ( !isValidPassword ) {
      return res.status(400).json({
        ok:false,
        msg:'La contraseña es incorrecta',
      })
    }

    // Generar JWT
    const token = await generateJWT( user.id, user.name );


    res.status(200).json({
      ok:true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      ok:false,
      msg:'Por favor hablar con el administrador',
    })
  }

  
}



module.exports = {
  renewToken,
  createUser,
  loginUser
}
