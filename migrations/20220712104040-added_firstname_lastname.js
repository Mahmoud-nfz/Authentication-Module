'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Users','firstname',Sequelize.STRING),
      queryInterface.addColumn('Users','lastname',Sequelize.STRING)
  ]
  },

  async down (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Users','firstname'),
      queryInterface.removeColumn('Users','lastname')
  ]
  }
};
