import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Menu from '../Menu';
import Routes from '../Routes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { verifyAuth } from '../../store/actions/userActions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { verifyAuth, history } = this.props;
    console.log('props', this.props);
    verifyAuth(history);
  }

  render() {
    return (
      <div>
        <Menu />
        <Routes />
      </div>
    );
  }
}

function mapStateToProps({ userReducer }) {
  return {
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    verifyAuth: bindActionCreators(verifyAuth, dispatch),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
