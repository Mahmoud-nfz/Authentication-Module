'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('ResetTokens', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'resettoken_user_fk', // optional
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('ResetTokens','resettoken_user_fk');
  }
};
