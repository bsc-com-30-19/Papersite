const express = require('express');
const {Pool} = require('pg');
//Make express router
const router = express.Router();

//Database connection
const pool = new Pool({
    user: 'postgres',
    host : 'localhost',
    database : 'papersite',
    password : 'chickenfat',
    port : 5432
});
//sign in route
router.get('/sign-up', (req,res) =>{
    pool.query(
        "SELECT * FROM USERAUTH",
        (err,results) =>{
            if(err) throw err;
            res.status(200).json(results.rows);
        }
    )
})
//sign up route
router.post('/sign-up',(req,res) =>{
    const {username, email, password} = req.body;

    pool.query(
        'INSERT INTO users (username, email, password) VALUES($1, $2, $3)',
        [username, email, password],
        (err, results) =>{
            if(err){
                console.error('Error executing query',err);
                res.status(500).send('Internal server error');
            }
            else{
                res.send('User signed up succesfully');
            }
        }
    )
});

//delete user route



module.exports = router;

