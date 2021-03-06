'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'ariana@grande.io',
        username: 'arianagrande',
        hashedPassword: bcrypt.hashSync('password'),
        profileImageUrl: 'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg'
      },
      {
        email: 'carlos@carlos.io',
        username: 'twincarloss',
        hashedPassword: bcrypt.hashSync('password'),
        profileImageUrl: 'https://avatars.githubusercontent.com/u/88858893?v=4'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
