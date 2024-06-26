const express = require('express');

const routes = express.Router();
const users = [{
    id: 1,
    name: 'Ana Paula',
    email: 'aninhagameplays@email.com',
    password: '12345'
},
{
    id: 2,
    name: 'Samara Cassie',
    email: 'samaragameplays@email.com',
    password: '54321'
}];

routes.post('/login', (req, res) => {
    const {email, password} = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if(user)
    {
        return res.status(200).json(user);
    }

    return res.status(401).json({message: 'Invalid credentials'})
})

routes.get('/login', (req, res) => {
    const userId = req.query.id;
    const user = users.find(user => user.id === parseInt(userId));

    if (user) {
        return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'User not found' });
});

routes.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            name: name || users[userIndex].name,
            email: email || users[userIndex].email,
            password: password || users[userIndex].password
        };
        return res.status(200).json(users[userIndex]);
    }

    return res.status(404).json({ message: 'User not found' });
});

module.exports = routes;