const express = require('express');
const app = express();
const cors = required('/cors');
const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
    res.send('hello world!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})