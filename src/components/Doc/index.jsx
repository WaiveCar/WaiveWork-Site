import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import './doc.scss';

function Doc(props) {
  const { type, userResourcesLoaded } = props;
  const currentFile = props[`${props.type}File`];
  return currentFile ? (
    <div>
      {currentFile.mime !== 'image/jpeg' ? (
        <div>
          {currentFile.mime === 'application/pdf' ? (
            <embed
              className={'doc-embed'}
              src={`http://docs.google.com/gview?url=http://waivecar-prod.s3.amazonaws.com/${currentFile.path}&embedded=true`}
            />
          ) : (
            <video classname={'doc-video'} controls="controls">
              <source
                src={`http://waivecar-prod.s3.amazonaws.com/${currentFile.path}`}
                type={'video/mp4'}
              />
            </video>
          )}
        </div>
      ) : (
        <img
          className={'doc-image'}
          src={`http://waivecar-prod.s3.amazonaws.com/${currentFile.path}`}
        />
      )}
    </div>
  ) : (
    <div>
      {userResourcesLoaded ? (
        <div>File not uploaded yet</div>
      ) : (
        <div>Loading resource</div>
      )}
    </div>
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
