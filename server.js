const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;

var app = express();

//hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('unable to append to server.log')
        }
    });

    next();
});


app.get('/', (req, res) => {
    res.send({
        name: "terry",
        likes: ['hiking', 'kite surfing']
    });
    //res.send('<h1>hello express</h1>');
});


app.get('/about', (req, res) => {
    res.render('about.hbs',
        {
            pageTitle: 'About Page',
            currentYear: new Date().getFullYear()
        });
});


app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'You are an error!' });
});


app.listen(port, () => {
    console.log('Server is up on port ', port);
});

