'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *    */
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: 1,
          name: "Super Admin"
        },
        {
          id: 2,
          name: "Manager"
        },
        {
          id: 3,
          name: "User"
        },
        {
          id: 4,
          name: "Artist"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     **/
    await queryInterface.bulkDelete('Roles', null, {});

  }
};