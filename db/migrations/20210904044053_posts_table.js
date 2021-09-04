const { Knex } = require("knex");
const tableName = require('../../src/utils/tableNames')

/**
 * @param {Knex} knex 
 */
exports.up = (knex) => {
        knex.schema.createTable(tableName.posts, (table) => {
                table.increments('id').primary().notNullable();
                table.string('title', 255).unique().notNullable();
                table.string('body', 155).notNullable();
                table.string('author').notNullable().references('users.id')
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
        .then((result) => console.log(result))
        .catch((err) => console.error(err));
};

/**
 * @param {Knex} knex 
 */
exports.down = (knex) => {
        return knex.schema.dropTableIfExists(tableName.posts)
        .then((results) => {
            console.log(results)
        })
        .catch((err) => {
            console.error(err);
        })
};
