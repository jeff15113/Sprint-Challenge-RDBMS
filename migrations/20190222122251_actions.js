exports.up = function(knex, Promise) {
  knex.schema
    .createTable("actions", table => {
      actions.increments();
      actions
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");
      actions.string("description", 256).notNullable();
      actions.text("notes").notNullable();
      actions.boolean("completed").defaultTo(false);
    })
    .then(console.log(Promise));
};
exports.down = function(knex, Promise) {};
