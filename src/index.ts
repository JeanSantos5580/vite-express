import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

app.use(express.json());


app.get('/api/users', (req, res) => {
    res.json(users);
})

app.post('/api/addUser', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Nome do usuário não fornecido' });
    }
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})