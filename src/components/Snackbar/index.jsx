import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideSnackbar } from '../../store/actions/snackbarActions';
import './snackbar.scss';

const Snackbar = ({ showSnackbar, message, color, hideSnackbar }) =>
  showSnackbar && (
    <div
      className="outer-snackbar"
      onClick={() => {
        hideSnackbar();
      }}
    >
      <div className="row justify-content-center">
        <div className="bottom">
          <div className="inner-snackbar" style={{ backgroundColor: color }}>
            {message}
          </div>
        </div>
      </div>
    </div>
  );

function mapStateToProps({ snackbarReducer }) {
  return {
    ...snackbarReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideSnackbar }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbar);
