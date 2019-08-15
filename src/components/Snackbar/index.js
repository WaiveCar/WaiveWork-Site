import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideSnackbar } from '../../store/actions/snackbarActions';
import './snackbar.scss';

class Snackbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    const { hideSnackbar, showSnackbar, message, color } = this.props;
  }

  render() {
    const { showSnackbar, message, color, hideSnackbar } = this.props;
    return (
      showSnackbar && (
        <div
          className="outer-snackbar"
          onClick={() => {
            hideSnackbar();
          }}
        >
          <div className="fixed-bottom">
            <div className="align-center">
              <div
                className="inner-snackbar"
                style={{ backgroundColor: color }}
              >
                {message}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

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
