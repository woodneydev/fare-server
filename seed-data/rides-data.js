const ridesData = [
  {driver_id: null, end_location: '18 Pine St.', rider_id: 1, rider_proposed_fare: 27, start_location: '17 Oak St.', start_time: '2023-06-18 12:00:00', status: 'unbooked'},
  {distance: 17.5, driver_id: null, driver_proposed_fare: 28, end_location: '20 Pine St.', end_time: '2023-06-20 13:00:00', fare: 27.5, rider_id: 2, rider_proposed_fare: 27, start_location: '19 Oak St.', start_time: '2023-06-20 12:00:00', status: 'unbooked'},
  {driver_id: null, end_location: '22 Pine St.', rider_id: 3, rider_proposed_fare: 29, start_location: '21 Oak St.', start_time: '2023-06-22 12:00:00', status: 'unbooked'},
  {driver_id: null, end_location: '24 Pine St.', rider_id: 4, rider_proposed_fare: 31, start_location: '23 Oak St.', start_time: '2023-06-24 12:00:00', status: 'unbooked'},
  {driver_id: null, end_location: '26 Pine St.', rider_id: 5, rider_proposed_fare: 33, start_location: '25 Oak St.', start_time: '2023-06-26 12:00:00', status: 'unbooked'},
  {driver_id: null, end_location: '28 Pine St.', rider_id: 6, rider_proposed_fare: 35, start_location: '27 Oak St.', start_time: '2023-06-28 12:00:00', status: 'unbooked'},
  {driver_id: null, end_location: '30 Pine St.', rider_id: 7, rider_proposed_fare: 37, start_location: '29 Oak St.', start_time: '2023-06-30 12:00:00', status: 'unbooked'}
];

for (let i = 8; i <= 15; i++) {
ridesData.push({
  driver_id: i % 2 === 0 ? i : null,
  end_location: `${2*i} Pine St.`,
  rider_id: i,
  rider_proposed_fare: 25 + i,
  start_location: `${2*i - 1} Oak St.`,
  start_time: `2023-07-${i - 7} 12:00:00`,
  status: i % 2 === 0 ? 'booked' : 'unbooked'
});
}

module.exports = ridesData;
