const express = require('express');
const {Pool} = require('pg');
const routes = require('./routes');

const app = express();
//Database connection
const pool = new Pool({
    username : 'postgres',
    host : 'localhost',
    database : 'Papersite',
    password : 'chickenfat',
    port : 5432
});

app.get('/', (req,res) =>{
    res.send('HELLO WORLD');
})

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api', routes);
app.listen(3200, ()=>{
    console.log('Server listening on port 3200')
});