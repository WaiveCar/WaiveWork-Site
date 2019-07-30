import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideSnackbar } from '../../store/actions/snackbarActions';

class Snackbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    const { hideSnackbar, showSnackbar, message } = this.props;
    if (showSnackbar) {
      this.interval = setTimeout(() => hideSnackbar(), 3000);
    }
  }

  render() {
    const { showSnackbar, message, color, hideSnackbar } = this.props;
    return (
      showSnackbar && (
        <div className="outer">
          <div className="inner">{message}</div>
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
  return {
    hideSnackbar: bindActionCreators(hideSnackbar, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbar);
