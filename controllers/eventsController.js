const { request, response }  = require('express');
const Event = require('../models/Event');



const getEvents = async ( req = request, res = response) => {
  console.log('Obteniedo todos los eventos');

  
  try {
    
    const events = await Event.find({ user: req.uid }).populate('user', 'name');

    res.status(201).json({
      ok:true,
      events,
    })


  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      ok:false,
      msg:'Por favor hablar con el administrador',
    })
  }
  
}

  const createNewEvent = async ( req, res = response) => {

  console.log('Creando evento');
  
  const event = new Event( req.body );

  event.user = req.uid;

  try {

    const eventSaved = await event.save();     

    res.status(201).json({
      ok:true,
      event: eventSaved,
    })


  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      ok:false,
      msg:'Por favor hablar con el administrador',
    })
  }
  
}

const updateEvent = async ( req, res = response) => {

  console.log('Actualizando evento');

  const eventId = req.params.id;

  try {

    const event = await Event.findById( eventId );

    if ( !event ) {
      return res.status(404).json({
        ok:false,
        msg:'No existe un evento con ese id',
      })
    }

    if ( event.user.toString() !== req.uid ) {
      return res.status(401).json({
        ok:false,
        msg:'Usuario no autorizado para editar este elemento',
      })
    }
  
    const newEvent = {
      ...req.body,
      user: req.uid
    };


    const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );     

    res.status(201).json({
      ok:true,
      event: eventUpdated,
    })


  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      ok:false,
      msg:'Por favor hablar con el administrador',
    })
  }
  
}

const deleteEvent = async ( req, res = response) => {

  console.log('Borrando evento');

  const eventId = req.params.id;

  try {

    const event = await Event.findById( eventId );

    if ( !event ) {
      return res.status(404).json({
        ok:false,
        msg:'No existe un evento con ese id',
      })
    }

    if ( event.user.toString() !== req.uid ) {
      return res.status(401).json({
        ok:false,
        msg:'Usuario no autorizado para eliminar este elemento',
      })
    }
  
    await Event.findByIdAndDelete( eventId );     

    res.status(200).json({ ok:true });


  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      ok:false,
      msg:'Por favor hablar con el administrador',
    })
  }
  
}



module.exports = {
  getEvents,
  createNewEvent,
  updateEvent,
  deleteEvent
}
