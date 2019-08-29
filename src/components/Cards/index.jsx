import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';

function Cards() {
  return <div>Cards</div>;
}

function mapStateToProps({ paymentReducer }) {
  return { ...paymentReducer };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cards);
