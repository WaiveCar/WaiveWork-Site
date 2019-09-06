import React from 'react';
import {
  addCard,
  deleteCard,
  selectCurrentlyUsedCard,
} from '../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';

function Personal({ paymentFormFields, user }) {
  return (
    <div className="container">
      <Form
        fields={paymentFormFields}
        title={'Add Card'}
        formName={'paymentForm'}
        onSubmit={(form) => addCard(form)}
        submitName={'Add'}
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
