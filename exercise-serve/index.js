const express = require('express');
const app = express();

app.use(express.static('public'));


app.get('/', function (req, res) {
    res.send("Hello world")
});

app.get('/about', function (req, res) {
    res.send("About Page")
});

app.get('/contact', function (req, res) {
    res.send("Contact Page")
});

app.use(function (req, res, next) {
    res.status(404).send('Not Found');
});

// For the 404 page I used this: https://github.com/krakenjs/kraken-js/issues/447

var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:' + server.address().port);
})
