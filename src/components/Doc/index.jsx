import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import './doc.scss';

function Doc(props) {
  const { type, userResourcesLoaded, currentBooking, user } = props;
  const currentFile = props[`${type}File`];
  const organizationFiles = props[`${type}Files`] && props[`${type}Files`];
  if (user.organizations && organizationFiles) {
    return (
      <div className="container">
        {user.organizations.map(
          (orgUser, i) =>
            JSON.parse(orgUser.organization.sections)[`${type}Files`] && (
              <div key={i}>
                <h1>{orgUser.organization.name}</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Expiration</th>
                      <th>Added</th>
                      <th>Show</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizationFiles[orgUser.organization.name].length ? (
                      organizationFiles[orgUser.organization.name].map(
                        (file, i) => (
                          <tr key={i}>
                            <td>{moment(file.comment).format('MM/DD/YYYY')}</td>
                            <td>
                              {moment(file.createdAt).format('MM/DD/YYYY')}
                            </td>
                            <td>
                              <a
                                href={`https://waivecar-prod.s3.amazonaws.com/${file.path}`}
                                target="_blank"
                              >
                                here
                              </a>
                            </td>
                          </tr>
                        ),
                      )
                    ) : (
                      <tr>
                        <td>No {type} uploaded</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ),
        )}
      </div>
    );
  }
  return (
    <div className="container">
      {currentFile ? (
        <div className="doc">
          <h1>Your {type}</h1>
          <h5 className="d-flex justify-content-between">
            <div>
              (expires {moment(currentFile.comment).format('MM/DD/YYYY')})
            </div>
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
        <div className="text-center">
          {(!currentBooking &&
            type !== 'registration' &&
            type !== 'inspection') ||
          (currentBooking &&
            !currentBooking.waiveworkPayment &&
            type === 'insurance') ? (
            <h5>Insurance card file not uploaded</h5>
          ) : (
            <h5>You are not currently in a WaiveWork booking</h5>
          )}
        </div>
      )}
    </div>
  );
}

function mapStateToProps({ userReducer, carReducer, bookingReducer }) {
  return { ...userReducer, ...carReducer, ...bookingReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Doc);
