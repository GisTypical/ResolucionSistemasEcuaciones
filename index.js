const express = require('express');
const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`listening on ${port} port`);
})

app.get('/envio', (req, res) => {
    let a = [
        { id: 1, nombre: "Gerardo" },
        { id: 2, nombre: "Gabriel" }
    ];
    res.json(a);
})