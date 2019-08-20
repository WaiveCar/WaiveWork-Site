import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Doc() {
  return <div>Doc</div>;
}

function mapStateToProps({ userReducer }) {
  return { ...userReducer };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Doc);
