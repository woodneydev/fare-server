function generateDriverProfilesSeedData() {
  const drivers = [
    {driver_id: 1, license_number: 'DL12345', license_expiry_date: '2025-06-30', vehicle_details: 'Toyota Camry 2019', vehicle_registration_number: 'ABC1234', insurance_provider: 'Geico', insurance_policy_number: 'G1234567', insurance_expiry_date: '2024-05-30', driver_rating: 5},
    {driver_id: 2, license_number: 'DL12346', license_expiry_date: '2024-01-15', vehicle_details: 'Honda Accord 2020', vehicle_registration_number: 'DEF5678', insurance_provider: 'State Farm', insurance_policy_number: 'S7654321', insurance_expiry_date: '2023-12-31', driver_rating: 4}
  ];

  for (let i = 3; i <= 15; i++) {
    drivers.push({
      driver_id: i,
      license_number: `DL1234${i}`,
      license_expiry_date: '2025-06-30',
      vehicle_details: `Car Model ${i} 2020`,
      vehicle_registration_number: `XYZ${i}${i}${i}${i}`,
      insurance_provider: 'SomeProvider',
      insurance_policy_number: `P1234${i}`,
      insurance_expiry_date: '2024-06-30',
      driver_rating: Math.floor(Math.random() * 6)
    });
  }

  return drivers;
}

const driverProfilesData = generateDriverProfilesSeedData();
module.exports = driverProfilesData;