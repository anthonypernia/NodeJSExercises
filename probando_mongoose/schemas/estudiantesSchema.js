let Joi = require('joi');
const nombre = Joi.string().min(3).required();
const apellido = Joi.string().min(3).required();
const edad = Joi.string().min(4).required();
const dni = Joi.string().min(4).required();
const curso = Joi.string().min(4).required();
const nota = Joi.string().min(4).required();

const estudiantesCreateSchema =  {
    nombre,
    apellido,
    edad,
    dni,
    curso,
    nota
}

module.exports = { estudiantesCreateSchema };
