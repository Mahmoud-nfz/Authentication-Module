const Sequelize = require('sequelize');
const sequelize = new Sequelize('authentication','root','', {
   // The `host` parameter is required for other databases
   host: 'localhost',
   dialect: 'mysql',
 });


module.exports = {
    Sequelize,
    sequelize
}