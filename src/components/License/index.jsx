import React from 'react';
import { updateLicense } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';

function License({ licenseFormFields, license, updateLicense }) {
  return (
    <div className="container">
      <Form
        fields={licenseFormFields}
        title={'Update License'}
        formName={'licenseForm'}
        onSubmit={(form) => updateLicense(license, form)}
        submitName={'Update'}
        formWidth={'60%'}
      />
    </div>
  );
}

function mapStateToProps({ userReducer, formReducer }) {
  return { ...userReducer, ...formReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateLicense }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(License);
