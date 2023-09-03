exports.up = function(knex) {
    return knex.schema.createTable('driver_profiles', table => {
      table.integer('driver_id').unsigned().primary().references('accounts.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('license_number').notNullable();  
      table.date('license_expiry_date').notNullable();  
      table.string('vehicle_details').notNullable();  
      table.string('vehicle_registration_number').notNullable(); 
      table.string('insurance_provider').nullable(); 
      table.string('insurance_policy_number').nullable(); 
      table.date('insurance_expiry_date').nullable();  
      table.integer('driver_rating').nullable();  
      table.integer('driver_total_rides').defaultTo(0);  
      table.boolean('availability').defaultTo(true);  
      table.string('driver_documents').nullable();  
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('driver_profiles');
};