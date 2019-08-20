import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Doc(props) {
  console.log('hopefully logging file', props[`${props.type}File`]);
  return (
    props[`${props.type}File`] && (
      <div>
        {
          <img
            src={`https://waivecar-prod.s3.amazonaws.com/${props[`${props.type}File`].path}`}
          />
        }
      </div>
    )
  );
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
