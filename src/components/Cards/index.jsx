import React, { useState } from 'react';
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
  const [addOpen, toggleAdd] = useState(false);
  return (
    <div className="container">
      <h5 className="mt-4 mb-4 text-center">Your Credit Cards</h5>
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
                <td className="pl-4">
                  <input type="checkbox" checked={card.selected} readOnly />
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => deleteCard(card.id, i)}
                    >
                      delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
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
      <div className="d-flex justify-content-center mt-4">
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => toggleAdd(!addOpen)}
        >
          {!addOpen ? 'Add Card' : 'Hide Editor'}
        </button>
      </div>
      {addOpen ? (
        <Form
          fields={paymentFormFields}
          formName={'paymentForm'}
          onSubmit={(form) => addCard(form)}
          submitName={'Add'}
          formWidth={'60%'}
          clearOnSubmit
        />
      ) : (
        <span />
      )}
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
