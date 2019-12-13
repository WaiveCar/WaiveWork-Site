import React from 'react';
import CarInfo from './CarInfo';
import ChargerInfo from './ChargerInfo';
import PaymentsPreview from './PaymentsPreview';

function Dashboard() {
  return (
    <div className="container mt-4 mb-4">
      <h1>Dashboard</h1>
      <div className="row d-flex justify-content-around">
        <ChargerInfo />
        <CarInfo />
        <PaymentsPreview />
      </div>
    </div>
  );
}

export default Dashboard;
