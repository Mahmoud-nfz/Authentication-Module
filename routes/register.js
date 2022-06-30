const { Router } = require('express');
const users = require("../users");
const getHashedPassword = require('../encryption/encryption').getHashedPassword ;

router = Router();


router.post('/', (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPassword) {

        // Check if user with the same email is also registered
        if (users.find(user => user.email === email)) {

            res.status(409).send({
                message: 'User already registered.',
            });

            return;
        }

        const hashedPassword = getHashedPassword(password);

        // Store user into the database if you are using one
        users.push({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.status(201).send({
            message: 'Registration Complete. Please login to continue.',
        });
    } else {
        res.status(400).send({
            message: 'Password does not match.',
        });
    }
});


module.exports = router;