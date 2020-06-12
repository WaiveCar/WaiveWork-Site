import React from 'react';
import { Link } from 'react-router-dom';
import MiniDoc from '../MiniDoc';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { carCommand } from '../../../store/actions/carActions';
import moment from 'moment';
import './carInfo.scss';

function CarInfo({
  car,
  carCommand,
  registrationFile,
  insuranceFile,
  insuranceFiles,
  user,
}) {
  let carOrg = user.organizations.find(
    (org) => car.organizationId === org.organizationId,
  );
  let carInsurance = insuranceFiles[carOrg.organization.name];
  return car ? (
    <div className="card booking-card mt-4">
      <div className="card-body">
        <h5 className="card-title">Your Car: {car.license}</h5>
        <div className="row d-flex justify-content-center">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => carCommand(car.id, 'lock')}
            >
              Lock
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => carCommand(car.id, 'unlock')}
            >
              Unlock
            </button>
          </div>
        </div>
        <Link to={'/registration'}>
          <div>
            <h5 className="mt-4">Registration</h5>
            <div className="d-flex justify-content-center">
              <MiniDoc file={registrationFile} />
            </div>
          </div>
        </Link>
        {!car.organizationId ? (
          <Link to={'/insurance'}>
            <h5 className="mt-4">Proof of Insurance</h5>
            <h5 className="mt-4">Proof of Insurance</h5>
            <div className="d-flex justify-content-center">
              <MiniDoc file={insuranceFile} />
            </div>
          </Link>
        ) : (
          JSON.parse(carOrg.organization.sections).insuranceFiles && (
            <div>
              <Link to={'/insurance'}>
                <h5 className="mt-4">Proof of Insurance</h5>
              </Link>
              <table className="table">
                <thead>
                  <tr>
                    <th>Expiration</th>
                    <th>Added</th>
                    <th>Show</th>
                  </tr>
                </thead>
                <tbody>
                  {carInsurance.length ? (
                    carInsurance.map((file, i) => (
                      <tr key={i}>
                        <td>{moment(file.comment).format('MM/DD/YYYY')}</td>
                        <td>{moment(file.createdAt).format('MM/DD/YYYY')}</td>
                        <td>
                          <a
                            href={`https://waivecar-prod.s3.amazonaws.com/${file.path}`}
                            target="_blank"
                          >
                            here
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No {type} uploaded</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  ) : (
    <div className="card booking-card mt-4">
      <div className="card-body">
        <h5 className="card-title">Car Controls</h5>
        <div className="text-center">
          You are not currently booked into WaiveWork
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ carReducer, userReducer }) {
  return {
    ...carReducer,
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ carCommand }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo);
