'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Posts', [
      { userId: 1, postImageUrl: 'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952', caption: 'i\'m so pretty', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, postImageUrl: 'https://media.vanityfair.com/photos/60a2d5b48fee0e2d204a876d/1:1/w_1333,h_1333,c_limit/ariana-grande-2020-grammys.jpg', caption: 'how gorgeos am i?', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, postImageUrl: 'https://iscale.iheart.com/catalog/artist/678625', caption: 'thank u next', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, postImageUrl: 'https://assets.teenvogue.com/photos/5e2e237e57d9890008a0d467/1:1/w_2783,h_2783,c_limit/GettyImages-1202144618.jpg', caption: '', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, postImageUrl: 'https://justsomething.co/wp-content/uploads/2020/10/woman-wakes-up-and-finds-a-random-cat-lying-in-her-bed-like-it-s-no-big-deal-04.jpg', caption: 'black kittie', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, postImageUrl: 'https://static.wixstatic.com/media/747083_b400ff589ebf474083386cff48221e9d~mv2.jpg/v1/fill/w_880,h_964,al_c,q_90/747083_b400ff589ebf474083386cff48221e9d~mv2.jpg', caption: 'cute kittie', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, postImageUrl: 'https://stickerly.pstatic.net/sticker_pack/13279e882d3a25af/YYN2BA/2/231e808b-6387-4789-94ed-de9f6efefda3-013.png', caption: 'sad kittie', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, postImageUrl: 'https://static.wikia.nocookie.net/9f316042-b44f-4020-9bc1-aa83ccf85816/scale-to-width/755', caption: '', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
