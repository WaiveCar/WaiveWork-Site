import React from 'react';
import CarInfo from './CarInfo';
import ChargerInfo from './ChargerInfo';
import PaymentsPreview from './PaymentsPreview';

function Dashboard() {
  return (
    <div className="container">
      Dashboard
      <CarInfo />
      <ChargerInfo />
      <PaymentsPreview />
    </div>
  );
}

export default Dashboard;
