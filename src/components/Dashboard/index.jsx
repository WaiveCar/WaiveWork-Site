import React from 'react';
import CarInfo from './CarInfo';
import ChargerInfo from './ChargerInfo';

function Dashboard() {
  return (
    <div className="container">
      Dashboard
      <CarInfo />
      <ChargerInfo />
    </div>
  );
}

export default Dashboard;
