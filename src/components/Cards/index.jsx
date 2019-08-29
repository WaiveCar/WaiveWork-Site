import React from 'react';
import { addCard } from '../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';

function Cards({ paymentForm, addCard, user }) {
  addCard = addCard.bind(null, user);
  return (
    <div className="container">
      <Form
        fields={paymentForm}
        title={'Add Card'}
        formName={'paymentFormFields'}
        onSubmit={(form) => addCard(form)}
        submitName={'Add'}
        formWidth={'60%'}
      />
    </div>
  );
}

function mapStateToProps({ paymentReducer, userReducer }) {
  return { ...paymentReducer, ...userReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCard }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cards);
