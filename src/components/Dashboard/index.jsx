import React from 'react';
import CarInfo from './CarInfo';
//import ChargerInfo from './ChargerInfo';
import PaymentsPreview from './PaymentsPreview';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Dashboard({ user }) {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="row d-flex justify-content-around">
        {/*<ChargerInfo />*/}
        {!user.organizations.length && <PaymentsPreview />}
        <CarInfo />
      </div>
    </div>
  );
}

function mapStateToProps({ userReducer }) {
  return { ...userReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
