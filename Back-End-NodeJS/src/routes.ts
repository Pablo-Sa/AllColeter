import express from 'express';
import PointsControllers from './controllers/pointsControllers';
import ItemsControllers from './controllers/itemsControllers';
import multer from 'multer';
import multerConfig from '../src/config/multer';
import { celebrate, Joi } from 'celebrate';


const routes = express.Router();

const upload = multer(multerConfig);

const pointsControllers = new PointsControllers();
const itemsControllers = new ItemsControllers();

routes.get('/items', itemsControllers.index)

routes.get('/points/:id', pointsControllers.show)
routes.get('/points', pointsControllers.index)
routes.delete('/points/:id', pointsControllers.delete)
routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object({
            nome: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    },{
     abortEarly: false   
    }),
    pointsControllers.create
);



export default routes