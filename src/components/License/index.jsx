import React from 'react';
import { updateLicense } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';

function License({ licenseFormFields, user, updateLicense }) {
  return (
    <div className="container">
      <Form
        fields={licenseFormFields}
        title={'Update License'}
        formName={'licenseForm'}
        onSubmit={(form) => updateLicense(form)}
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
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(License);
