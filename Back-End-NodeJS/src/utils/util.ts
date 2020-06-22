interface Points{
    id: number;
    image: string; 
    nome: string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    city: string;
    uf: string;
}

class Utils {
    serializedPoints(points: Points[]){
        const pointsSerialized = points.map(point => {
            return {
                ...point,
                image_url: `http://10.0.0.101:3333/uploads/${point.image}`
            };
        })
      return pointsSerialized;  
    };

    serializedPoint(point: Points) {
        const pointSerialized = {
            ...point,
            image_url: `http://10.0.0.101:3333/uploads/${point.image}`
        }
        return pointSerialized;
    }
}

export default Utils;

