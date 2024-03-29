import { Response, Request } from 'express';
import knex from '../database/connection';
import Utils from '../utils/util';

class PointsControllers {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const utils = new Utils();  

    const serializedPoints = utils.serializedPoints(points);

    return response.json(serializedPoints)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Item Not Found.' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    const utils = new Utils();  
    
    const serializedPoint = utils.serializedPoint(point);

    return response.json({
      point: serializedPoint,
      items
    });
  }


  async create(request: Request, response: Response) {
    const {
      nome,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      nome,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const insertedIds = await trx('points').insert(point);

    const point_id = insertedIds[0];

    const pointItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))
      .map((item_id: number) => {
      return {
        item_id,
        point_id
      };
    })

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: point_id,
      ...point
    })

  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).delete();

    if (!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    return response.json({ msg: 'successfully deleted' });
  }
}

export default PointsControllers