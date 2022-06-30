const express = require('express') ;
const cors = require('cors');
const app = express();

// const exphbs = require('express-handlebars');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const users = require('./users');


/* importing routes */
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
/* \importing routes*/


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// app.use(cookieParser());
// app.engine('hbs',exphbs({extname:'.hbs'}));
// app.set('view engine','hbs');

/* mapping routes */
app.use('/register',registerRoute);
app.use('/login',loginRoute);
app.use('/list',(req,res)=>{
    // console.log(users) ;
    res.status(200).send({'users' : users}) ;
})
/* \mapping routes */






app.listen(8000,()=> console.log('listening on 8000'));
