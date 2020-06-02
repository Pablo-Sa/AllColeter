import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Teste'); 

    response.json(['Pablo','Maria Antônia'])

})

app.listen(3333);