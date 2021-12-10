import Joi from 'joi';

const id = Joi.string().min(3).required();
const timestamp = Joi.string().min(3).required();
const name = Joi.string().min(4).required();
const description = Joi.string().min(4).required();
const code = Joi.string().min(4).required();
const photo = Joi.string().min(4).required();
const price = Joi.string().min(4).required();
const stock = Joi.string().min(4).required();

const ProductsSchema = {
    id,
    timestamp,
    name,
    description,
    code,
    photo,
    price,
    stock
}

export { ProductsSchema };