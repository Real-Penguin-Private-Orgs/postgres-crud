const { Knex } = require("knex");
const tableName = require('../../src/utils/tableNames')

/**
 * @param {Knex} knex 
 */
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex(tableName.posts).del()
    .then(() => {
      // Inserts seed entries
      return knex(tableName.posts).insert([
            {
              id: 1,
              title: 'Hello World',
              body: 'Created By Wisly',
              author: 'RealPenguin'
            }
      ]);
    });
};
