exports.up = function(knex, Promise) {
  knex.schema
    .createTable("projects", table => {
      projects.increments();
      projects.string("name", 256).notNullable();
      projects.text("description").notNullable();
      projects.boolean("completed").defaultTo(false);
    })
    .then(p => {
      console.log(p);
    });
};

exports.down = function(knex, Promise) {};
