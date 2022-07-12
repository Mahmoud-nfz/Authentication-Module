const { Router } = require('express');
// const users = require("../users");
const getHashedPassword = require('../encryption/encryption').getHashedPassword ;
const generateAuthToken = require('../encryption/encryption').generateAuthToken ;
const sequelize = require('../dbconnection').sequelize ;
const Sequelize = require('../dbconnection').Sequelize ;
const User = require('../models/user')(sequelize, Sequelize.DataTypes);

router = Router();



const authTokens = {};

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = await User.findOne({where : {email : email}});


    if (user) {
        if(user.dataValues.password !== hashedPassword){
            res.status(401).send({
                message: 'Invalid password',
            });
            return;
        }
        const authToken = generateAuthToken();

        // Store authentication token
        authTokens[authToken] = user;

        // Setting the auth token in cookies
        res.cookie('AuthToken', authToken);

        // Redirect user to the protected page
        res.status(200).send({
            message : "Succesfully logged in as "+email ,
        })
    } else {
        res.status(401).send({
            message: 'Invalid email',
        });
    }
});


module.exports = router;