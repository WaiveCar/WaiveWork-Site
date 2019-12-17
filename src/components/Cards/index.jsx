import React from 'react';
import {
  addCard,
  deleteCard,
  selectCurrentlyUsedCard,
} from '../../store/actions/paymentActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from '../Form';
import './cards.scss';

function Cards({
  paymentFormFields,
  addCard,
  deleteCard,
  selectCurrentlyUsedCard,
  user,
  cards,
}) {
  addCard = addCard.bind(null, user);
  return (
    <div className="container">
      <h5 className="mt-4 mb-4 text-center">Your Cards</h5>
      <div className="row justify-content-center">
        <table className="card-list col-md-6">
          <thead>
            <tr>
              <th>Last 4</th>
              <th>Brand</th>
              <th>Expiration</th>
              <th>Selected</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, i) => (
              <tr key={i}>
                <td>{card.last4}</td>
                <td>{card.brand}</td>
                <td>{`${card.expMonth}/${card.expYear}`}</td>
                <td>{card.selected ? <span>selected</span> : <span />}</td>
                <td>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => deleteCard(card.id, i)}
                    >
                      delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => selectCurrentlyUsedCard(card.id)}
                    >
                      select
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Form
        fields={paymentFormFields}
        title={'Add Card'}
        formName={'paymentForm'}
        onSubmit={(form) => addCard(form)}
        submitName={'Add'}
        formWidth={'60%'}
        clearOnSubmit
      />
    </div>
  );
}

function mapStateToProps({ paymentReducer, userReducer, formReducer }) {
  return { ...paymentReducer, ...userReducer, ...formReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addCard, deleteCard, selectCurrentlyUsedCard },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
