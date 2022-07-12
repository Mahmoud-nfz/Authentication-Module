const express = require('express') ;
const cors = require('cors');
const app = express();
const PORT = 8004 ;

// const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const users = require('./users');


/* importing routes */
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
/* \importing routes*/

/* Middlewares */
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     // Get auth token from the cookies
//     const authToken = req.cookies['AuthToken'];

//     // Inject the user to the request
//     req.user = authTokens[authToken];

//     next();
// });

/* \MiddleWares */


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

app.get('/', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });

/* \mapping routes */


// const requireAuth = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.render('login', {
//             message: 'Please login to continue',
//             messageClass: 'alert-danger'
//         });
//     }
// };

// app.get('/protected', requireAuth, (req, res) => {
//     res.render('protected');
// });



app.listen(PORT,()=> console.log(`listening on ${PORT}`));
