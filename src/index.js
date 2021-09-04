const express = require('express');
const cors = require('cors')
const session = require('express-session')
const morgan = require('morgan')
const PORT = process.env.PORT || 3001;
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

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});