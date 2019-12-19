import React, { useState } from 'react';
import {
  addCard,
  deleteCard,
  selectCurrentlyUsedCard,
} from '../../store/actions/paymentActions';
import Chevron from '../../svg/chevron-right.svg';
import Times from '../../svg/times-circle.svg';
import Check from '../../svg/check-circle.svg';
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
    <div className="container large-mt">
      <h5 className="text-center">Your Credit Cards</h5>
      <div className="row justify-content-center">
        <table className="card-list col-md-6">
          <thead>
            <tr>
              <th>Selected</th>
              <th>Last 4</th>
              <th>Brand</th>
              <th>Expiration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.length ? (
              cards.map((card, i) => (
                <tr key={i}>
                  <td className="pl-2">
                    {card.selected ? <Chevron className="cards-icon" /> : ''}
                  </td>
                  <td>{card.last4}</td>
                  <td>{card.brand}</td>
                  <td>{`${card.expMonth}/${card.expYear}`}</td>
                  <td>
                    <div className="d-flex justify-content-around w-60">
                      <Check
                        className="circle-icon check-circle"
                        onClick={() => selectCurrentlyUsedCard(card.id)}
                      />
                      <Times
                        className="circle-icon times-circle"
                        onClick={() => deleteCard(card.id, i, card.last4)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="mt2">
                <td className="text-center" colSpan={5}>
                  No Cards Added Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => toggleAdd(!addOpen)}
        >
          {!addOpen ? 'Add Card' : 'Hide'}
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
