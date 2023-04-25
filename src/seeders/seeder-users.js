'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      email: 'duong1818@gmail.com',
      password: '123456', // plain text -> sfw35wtwegfs : hash password
      firstName: 'duong',
      lastName: 'thanh',
      address: 'USA',
      phoneNumber: '0900001234',
      gender: 1,
      roleId: 'R1',
      positionId: 'P1',
      image:'',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
