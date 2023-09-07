exports.up = function(knex) {
    return knex.schema.createTable('rides', table => {
        table.increments('id').primary();
        table.integer('rider_id').unsigned().references('accounts.id');
        table.integer('driver_id').unsigned().references('accounts.id'); 
        table.string('start_location').notNullable(); 
        table.string('end_location').notNullable();
        table.timestamp('start_time'); 
        table.timestamp('end_time');
        table.decimal("rider_proposed_fare");
        table.decimal("driver_proposed_fare");
        table.decimal('fare').nullable();
        table.string('status').notNullable().defaultTo('unbooked');
        table.text('notes').nullable();
        table.decimal('distance').nullable(); 
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('rides');
};