const { Router } = require('express');
// const users = require("../users");
const getHashedPassword = require('../encryption/encryption').getHashedPassword ;
const sequelize = require('../dbconnection').sequelize ;
const Sequelize = require('../dbconnection').Sequelize ;
const User = require('../models/user')(sequelize, Sequelize.DataTypes);

router = Router();


router.post('/', async (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    console.log(req.body)

    // Check if the password and confirm password fields match
    if (password === confirmPassword) {

        // Check if user with the same email is also registered
        if (await User.findOne({where : {email : email}})) {

            res.status(409).send({
                message: 'User already registered.',
            });

            return;
        }

        const hashedPassword = getHashedPassword(password);

        // Store user into the database if you are using one
        User.create({
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