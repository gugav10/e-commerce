/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { readFile } = require('fs/promises');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const cities = JSON.parse(
      await readFile(path.join(__dirname, '../data/cities.json'), 'utf8'),
    );
    await queryInterface.bulkInsert('cities', cities);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('cities', null, {});
  },
};
