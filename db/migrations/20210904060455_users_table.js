const { Knex } = require("knex");
const tableName = require('../../src/utils/tableNames')

/**
 * @param {Knex} knex 
 */
exports.up = (knex) => {
        knex.schema.createTable(tableName.users, (table) => {
                table.increments('id').primary().notNullable();
                table.string('username').unique().notNullable();
                table.string('email', 177).notNullable();
                table.string('password').notNullable();
                table.datetime('created_at').defaultTo(knex.fn.now());
        })
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.error(err)
        })
};

/**
 * @param {Knex} knex 
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists(tableName.users)
        .then((results) => {
            console.log(results)
        })
        .catch((err) => {
            console.error(err);
        })
};
