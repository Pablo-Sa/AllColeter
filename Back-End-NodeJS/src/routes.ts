import express from 'express';
import PointsControllers from './controllers/pointsControllers';
import ItemsControllers from './controllers/itemsControllers';
import multer from 'multer';
import multerConfig from '../src/config/multer';


const routes = express.Router();

const upload = multer(multerConfig);

const pointsControllers = new PointsControllers();
const itemsControllers = new ItemsControllers();

routes.get('/points/:id', pointsControllers.show)
routes.get('/points', pointsControllers.index)
routes.post('/points', upload.single('image'), pointsControllers.create)
routes.delete('/points/:id', pointsControllers.delete)

routes.get('/items', itemsControllers.index)

export default routes