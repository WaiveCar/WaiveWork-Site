import React from 'react';
import { updateUser } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';

function PasswordUpdate({ passwordFormFields, user, updateUser }) {
  return (
    <div className="container">
      <Form
        fields={passwordFormFields}
        title={'Update Password'}
        formName={'passwordForm'}
        onSubmit={(form) => updateUser(user, form)}
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
  return bindActionCreators({ updateUser }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordUpdate);
