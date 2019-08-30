import React from 'react';
import { addCard } from '../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';

function Cards({ paymentFormFields, addCard, user }) {
  addCard = addCard.bind(null, user);
  console.log('fields', paymentFormFields);
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

function mapStateToProps({ paymentReducer, userReducer, formReducer }) {
  return { ...paymentReducer, ...userReducer, ...formReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCard }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cards);
