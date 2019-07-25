import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function Signup() {
  return <div>Signup</div>;
}

function mapDispatchToProps(props) {
  return {};
}

function mapStateToProps(props) {
  return {};
}

export default connect(
  mapDispatchToProps,
  mapStateToProps,
)(Signup);
