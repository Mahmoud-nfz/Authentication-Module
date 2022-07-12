const {Router} = require('express') ;
const jwt = require('jsonwebtoken') ;

router = Router() ;

router.post('/',(req,res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token) ;
    if(token == null){
        return res.sendStatus(401);
    }
   
    const decodedToken = jwt.verify(token,'secretkeyappearshere') ;
    console.log(decodedToken) ;

    res.status(200).send(decodedToken)
})


module.exports = router ;