import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import './doc.scss';

function Doc(props) {
  const { type, userResourcesLoaded } = props;
  const currentFile = props[`${props.type}File`];
  return currentFile ? (
    <div className="container mt-4">
      <h1>Your {type}</h1>
      <h5 className="d-flex justify-content-between">
        <div>(expires {moment(currentFile.comment).format('MM/DD/YYYY')})</div>
        <a
          href={`https://waivecar-prod.s3.amazonaws.com/${currentFile.path}`}
          target="_blank"
        >
          Download
        </a>
      </h5>
      <div className="row d-flex justify-content-center mt-4">
        {currentFile.mime !== 'image/jpeg' ? (
          currentFile.mime === 'application/pdf' ? (
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
          )
        ) : (
          <img
            className={'doc-image'}
            src={`http://waivecar-prod.s3.amazonaws.com/${currentFile.path}`}
          />
        )}
      </div>
    </div>
  ) : (
    <div>
      <div>File not uploaded yet</div>
    </div>
  );
}

function mapStateToProps({ userReducer, carReducer }) {
  return { ...userReducer, ...carReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Doc);
