import React from 'react';
import CarInfo from './CarInfo';
//import ChargerInfo from './ChargerInfo';
import PaymentsPreview from './PaymentsPreview';

function Dashboard() {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="row d-flex justify-content-around">
        {/*<ChargerInfo />*/}
        <PaymentsPreview />
        <CarInfo />
      </div>
    </div>
  );
}

export default Dashboard;
