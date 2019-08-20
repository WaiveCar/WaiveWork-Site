import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function Doc(props) {
  const { type } = props;
  return props[`${props.type}File`] ? (
    <div>
      {props[`${type}File`].mime !== 'image/jpeg' ? (
        <div>
          {props[`${type}File`].mime === 'application/pdf' ? (
            <embed
              style={{ maxWidth: '100%' }}
              src={`http://docs.google.com/gview?url=http://waivecar-prod.s3.amazonaws.com/${props[`${type}File`].path}&embedded=true`}
            />
          ) : (
            <video
              style={{ maxWidth: '100%', maxHeight: '250px' }}
              controls="controls"
            >
              <source
                src={`http://waivecar-prod.s3.amazonaws.com/${props[`${type}File`].path}`}
                type={'video/mp4'}
              />
            </video>
          )}
        </div>
      ) : (
        <img
          style={{ maxWidth: '100%', maxHeight: '300px' }}
          src={`http://waivecar-prod.s3.amazonaws.com/${props[`${type}File`].path}`}
        />
      )}
    </div>
  ) : (
    <div>File not uploaded yet</div>
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
