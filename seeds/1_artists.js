'use strict';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('artists').del()
    .then(() => {
      return knex('artists').insert([
        {
          id: 1,
          name: 'The Beatles'
        },
        {
          id: 2,
          name: 'Adele'
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('artists_id_seq', (SELECT MAX(id) FROM artists));"
      );
    });
};
