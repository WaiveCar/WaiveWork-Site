import React from 'react';
import CarInfo from './CarInfo';
import ChargerInfo from './ChargerInfo';
import PaymentsPreview from './PaymentsPreview';

function Dashboard() {
  return (
    <div className="container">
      <h3>Dashboard</h3>
      <CarInfo />
      <ChargerInfo />
      <PaymentsPreview />
    </div>
  );
}

export default Dashboard;
