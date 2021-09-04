const express = require('express');
const cors = require('cors')
const session = require('express-session')
const morgan = require('morgan')
const PORT = process.env.PORT || 3001;
const bcrypt = require('bcrypt')
const knex = require('./knex');
const app = express();

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({  extended: true  }))
app.use(session({
  secret:  process.env.TOKEN_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.get('/', async(req, res) => {
    // select * from `posts`
    let data = await knex.select('*').from('posts')
    res.json(data);
});

app.get('/posts/:id', async(req, res) => {
    let {  id } = req.params
    let postData = await knex('posts').where('id', id)
    res.json(postData)
})

app.post('/register', (req, res) => {
    let {username, email, password} = req.body;
    var saltRounds = 10;

    if(!username || !email || !password) {
        return res.status(406).json({
            message: 'Field Cant Be Empty'
        })
    }

    bcrypt.genSalt(saltRounds, (err, salts) => {
        bcrypt.hash(password, salts, (err, hash) => {
            knex('users').insert({
                username: username,
                email: email,
                password: hash
            })
            .then((response) => {
                res.status(201).json(response);     
            })
            .catch((err) => {
                console.error(err)
            })
        })
    })
})

app.post('/login', (req, res) => {
        let { username, password } = req.body;
        if(!username || !password) {
            return res.status(406).json({
                message: 'Field Cant Be Empty'
            })
        }

        knex('users').where({ 
            username: username
        }).select('*')
        .then((result) => {
            if (!result || !result[0])  {  // not found!
                res.status(404).json({message: 'User Not Found'})
                return;
              }
              var pass = result[0].password;
              bcrypt.compare(password, pass, (err, response) => {
                    if(err) throw err;
                    if(response) {
                        return res.json(result);
                    } else {
                        return res.json({message: 'Wrong Password'})
                    }
              })
        })
        .catch((err) => {
            console.error(err);
        })
})

app.get('/users/:id', async(req, res) => {
    let {  id } = req.params
    let userData = await knex('users').where('id', id)
    if(!userData) {
        return res.status(404).send('User Not Found')
    }  else {
        return res.json(userData)
    }   
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});