import express from 'express';
import PointsControllers from './controllers/pointsControllers';
import ItemsControllers from './controllers/itemsControllers';


const routes = express.Router();

const pointsControllers = new PointsControllers();
const itemsControllers = new ItemsControllers();

routes.get('/points/:id', pointsControllers.show)
routes.get('/points', pointsControllers.index)
routes.post('/points', pointsControllers.create)
routes.delete('/points/:id', pointsControllers.delete)

routes.get('/items', itemsControllers.index)

export default routes