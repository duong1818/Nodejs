module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
        return Promise.all([
          queryInterface.changeColumn('Users', 'image', {type: Sequelize.BLOB('long'), allowNull: true}, { transaction: t })
        ]);
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
        return Promise.all([
          queryInterface.changeColumn('Users', 'image', {type: Sequelize.STRING, allowNull: true}, { transaction: t }),
        ]);
      });
    }
  };