import React from 'react';
import connect from 'react-redux';
import bindActionCreators from 'redux';

function Snackbar() {
  return <div>Snackbar</div>;
}

function mapStateToProps({ snackbarReducer }) {
  return {
    ...snackbarReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbar);
