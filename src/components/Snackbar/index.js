import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideSnackbar } from '../../store/actions/snackbarActions';

function Snackbar({ showSnackbar, message, color }) {
  return showSnackbar && <div>Snackbar</div>;
}

function mapStateToProps({ snackbarReducer }) {
  return {
    ...snackbarReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideSnackbar: bindActionCreators(hideSnackbar, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbar);
