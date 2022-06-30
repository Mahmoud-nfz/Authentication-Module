const { Router } = require('express');
const users = require("../users");
const getHashedPassword = require('../encryption/encryption').getHashedPassword ;
const generateAuthToken = require('../encryption/encryption').generateAuthToken ;


router = Router();



const authTokens = {};

router.post('/', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = users.find(u => {
        return u.email === email && hashedPassword === u.password
    });

    if (user) {
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
        res.status(400).send({
            message: 'Invalid username or password',
        });
    }
});


module.exports = router;