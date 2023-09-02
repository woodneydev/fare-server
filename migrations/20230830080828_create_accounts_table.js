exports.up = function (knex) {
    return knex.schema
      .createTable("accounts", (table) => {
        table.increments("id").primary();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("email").notNullable().unique();
        table.string("phone");
        table.boolean("is_driver").defaultTo(false);
        table.string("password", 60).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
  };


exports.down = function (knex) {
    return knex.schema.dropTable("accounts");
};
