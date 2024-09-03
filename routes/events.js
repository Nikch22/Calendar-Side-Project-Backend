/*
//* RUTAS DE /events
//* HOST + /api/events
*/

const { Router } = require('express');
const { check }  = require('express-validator');
const { validateFields }  = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, 
  createNewEvent, 
  updateEvent, 
  deleteEvent } = require('../controllers/eventsController');
const { isDateValidator } = require('../helpers/isDateValidator');

const router = Router();

router.use( validateJWT );

router.get('/', 
  [ //middlewares
    
  ]
  , getEvents );

router.post('/', 
  [ //middlewares
    check( 'title', 'El título es obligatorio').notEmpty(),
    check( ['start','end'], 'Las fechas son obligatorias').notEmpty(),
    check('start', 'La fecha de inicio no es válida').custom( isDateValidator ),
    check('end', 'La fecha de fin no es válida').custom( isDateValidator ),
    validateFields
  ]
  , createNewEvent );

router.put('/:id',
  [ //middlewares
    check( 'title', 'El título es obligatorio').notEmpty(),
    check( ['start','end'], 'Las fechas son obligatorias').notEmpty(),
    check('start', 'La fecha de inicio no es válida').custom( isDateValidator ),
    check('end', 'La fecha de fin no es válida').custom( isDateValidator ),
    validateFields
  ]
  , updateEvent );

router.delete('/:id',
  [ //middlewares
    // check( 'email', 'El email es obligatorio').isEmail(),
    // check( 'password', 'La clave de tener mínimo 6 caracteres').isLength({ min: 6 }),
    // validateFields
  ]
  , deleteEvent );









module.exports = router;