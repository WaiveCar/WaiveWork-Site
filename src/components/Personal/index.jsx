import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';

function Personal({ personalFormFields, user }) {
  return (
    <div className="container">
      <Form
        fields={personalFormFields}
        title={'Add Card'}
        formName={'personalForm'}
        onSubmit={(form) => console.log(form)}
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
)(Personal);
