const { Router } = require('express');
const getHashedPassword = require('../encryption/encryption').getHashedPassword ;
const generateAuthToken = require('../encryption/encryption').generateAuthToken ;
const sequelize = require('../dbconnection').sequelize ;
const Sequelize = require('../dbconnection').Sequelize ;
const User = require('../models/user')(sequelize, Sequelize.DataTypes);
const jwt = require('jsonwebtoken')


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

        token = jwt.sign(
            { userId: user.id, email: user.email },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
        res
        .status(200)
        .json({
        success: true,
        data: {
            userId: user.id,
            email: user.email,
            token: token,
        },
        });

    } else {
        res.status(401).send({
            message: 'Invalid email',
        });
    }
});


module.exports = router;