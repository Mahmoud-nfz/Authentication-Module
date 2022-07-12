'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Audits', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'audits_user_fk', // optional
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Audits','audits_user_fk');
  }
};
