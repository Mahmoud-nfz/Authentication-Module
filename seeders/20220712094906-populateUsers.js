'use strict';

const random = require('../generators/randomString')
 
module.exports = {
  async up (queryInterface, Sequelize) {
    const arr = [] ;

    for(let i = 0 ; i < 30 ; i ++){
      arr.push({
        email : random(),
        password : random(20) 
      })
    }

    await queryInterface.bulkInsert('Users',arr,{});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
