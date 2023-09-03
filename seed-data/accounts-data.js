const bcrypt = require('bcryptjs');

function generateSeedData() {
  const users = [
    {first_name: 'John', last_name: 'Doe', email: 'john1@example.com', password: 'password123', phone: '123-456-7890', rider_rating: 4, is_driver: true, profile_picture: 'john1.jpg', address: '123 Elm St.'},
    {first_name: 'Jane', last_name: 'Smith', email: 'jane2@example.com', password: 'password456', phone: '123-456-7891', rider_rating: 5, profile_picture: 'jane2.jpg', address: '124 Elm St.'},
    {first_name: 'Alice', last_name: 'Johnson', email: 'alice3@example.com', password: 'alicepass', phone: '555-456-7890', rider_rating: 5, is_driver: true},
    {first_name: 'Bob', last_name: 'Brown', email: 'bob4@example.com', password: 'bobpass', phone: '555-456-7891', rider_rating: 3, profile_picture: 'bob4.jpg'},
    {first_name: 'Charlie', last_name: 'Clark', email: 'charlie5@example.com', password: 'charliepass', phone: '444-456-7890', rider_rating: 4, is_driver: true},
    {first_name: 'David', last_name: 'Dixon', email: 'david6@example.com', password: 'davidpass', phone: '444-456-7891', rider_rating: 4, is_driver: true, profile_picture: 'david6.jpg'},
    {first_name: 'Eve', last_name: 'Elliot', email: 'eve7@example.com', password: 'evepass', phone: '333-456-7890', rider_rating: 5},
    {first_name: 'Frank', last_name: 'Ferguson', email: 'frank8@example.com', password: 'frankpass', phone: '333-456-7891', rider_rating: 2, is_driver: true},
    {first_name: 'Grace', last_name: 'Green', email: 'grace9@example.com', password: 'gracepass', phone: '222-456-7890', rider_rating: 5, profile_picture: 'grace9.jpg', address: '130 Elm St.'},
    {first_name: 'Hannah', last_name: 'Hunt', email: 'hannah10@example.com', password: 'hannahpass', phone: '222-456-7891', rider_rating: 3, is_driver: true},
    {first_name: 'Ivan', last_name: 'Irwin', email: 'ivan11@example.com', password: 'ivanpass', phone: '111-456-7890', rider_rating: 4, profile_picture: 'ivan11.jpg'},
    {first_name: 'Jasmine', last_name: 'Jones', email: 'jasmine12@example.com', password: 'jasminepass', phone: '111-456-7891', rider_rating: 3, is_driver: true, address: '133 Elm St.'},
    {first_name: 'Kevin', last_name: 'King', email: 'kevin13@example.com', password: 'kevinpass', phone: '666-456-7890', rider_rating: 5},
    {first_name: 'Linda', last_name: 'Larson', email: 'linda14@example.com', password: 'lindapass', phone: '666-456-7891', rider_rating: 3, profile_picture: 'linda14.jpg'},
    {first_name: 'Mike', last_name: 'Morrison', email: 'mike15@example.com', password: 'mikepass', phone: '777-456-7890', rider_rating: 4, is_driver: true, address: '139 Elm St.'}
  ];

  for (let user of users) {
    user.password = bcrypt.hashSync(user.password);
  }

  return users;
}

const accountsData = generateSeedData();


module.exports = accountsData;