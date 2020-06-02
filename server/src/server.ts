import express, { response } from 'express';

const app = express();

app.use(express.json());


const users = [
    'Pablo',
    'Angelina Jolie',
    'Maria Antônia'
    ]

app.get('/users', (request, response) => {

    const search = String(request.query.search);

    const filteredUsers =  search ? users.filter(user => user.includes(search)) : users;

    response.json(filteredUsers)
})


app.get('/users/:id', (request, response) =>{
    console.log(`Buscando Usuário por ID`);

    const id =  Number(request.params.id);

    const user = users[id];

    return response.json(user);
});



app.post('/users',(request, response) =>{
    const data = request.body;

    console.log(`Criando um Novo User ${data}`);

    const newUser = {
        name: data.name,
        email: data.email
    }

    return response.json(newUser)

})



app.listen(3333);