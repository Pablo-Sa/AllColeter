import { Response, Request, request, response } from 'express';
import knex from '../database/connection';

class ItemsControllers {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/images/${item.image}`
            };

        })

        return response.json(serializedItems)
    }
}

export default ItemsControllers