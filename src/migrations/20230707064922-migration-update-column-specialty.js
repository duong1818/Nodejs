'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Specialties', 'image', {type: Sequelize.BLOB('long'), allowNull: true}, { transaction: t }),
        queryInterface.renameColumn('Specialties', 'description', 'descriptionHTML'),
        queryInterface.addColumn('Specialties', 'descriptionMarkdown', {type: Sequelize.TEXT})
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Specialties', 'image', {type: Sequelize.STRING, allowNull: true}, { transaction: t }),
        queryInterface.renameColumn('Specialties', 'descriptionHTML', 'description'),
        queryInterface.removeColumn('Specialties', 'descriptionMarkdown')
      ]);
    });
  }
};
