import React from 'react';
import { updateUser } from '../../store/actions/userActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';

function Personal({ personalFormFields, user, updateUser }) {
  return (
    <div className="container large-mt">
      <Form
        fields={personalFormFields}
        title={'Personal Info'}
        formName={'personalForm'}
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

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
