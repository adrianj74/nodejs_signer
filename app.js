const express = require('express');
const path = require('path');

const app = express();
const port = 9000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/main.html'));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});