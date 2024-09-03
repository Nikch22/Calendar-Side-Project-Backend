/*
//* RUTAS DE /auth
//* HOST + /api/auth
*/

const { Router } = require('express');
const { check }  = require('express-validator');
const { validateFields }  = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createUser, renewToken, loginUser } = require('../controllers/authController');

const router = Router();

//Rutas de Auth
router.get('/renew', 
  [ //middlewares
    validateJWT
  ]
  , renewToken );

router.post('/new',
  [ //middlewares
    check( 'name', 'El nombre es obligatorio').notEmpty(),
    check( 'email', 'El email es obligatorio').isEmail(),
    check( 'password', 'La clave de tener mínimo 6 caracteres').isLength({ min: 6 }),
    validateFields
  ]
  , createUser );

router.post('/',
  [ //middlewares
    check( 'email', 'El email es obligatorio').isEmail(),
    check( 'password', 'La clave de tener mínimo 6 caracteres').isLength({ min: 6 }),
    validateFields
  ]
  , loginUser );









module.exports = router;