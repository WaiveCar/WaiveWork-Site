import React from 'react';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateForm, clearForm } from '../../store/actions/formActions';
import { showSnackbar } from '../../store/actions/snackbarActions';
import './form.scss';

function Form(props) {
  const {
    fields,
    formName,
    updateForm,
    onSubmit,
    altAction,
    submitName,
    altActionName,
    showSnackbar,
    formWidth,
    title,
    body,
    clearOnSubmit,
    clearForm,
  } = props;
  const currentForm = props[formName];
  let missing = fields
    .map((item) => !currentForm[item.formField] && item.name)
    .filter((item) => item);
  return (
    <div className="container form-holder mt-4">
      <div className="row justify-content-center">
        {title ? <h5>{title}</h5> : <span />}
      </div>
      {body && <div className="row justify-content-center">{Parser(body)}</div>}
      <div className="row justify-content-center">
        <div className="inner-form">
          {fields.map((field, i) => {
            return field.type !== 'radio' ? (
              <div className="input-row form-group" key={i}>
                <div className={'row justify-content-center'}>
                  {field.label ? (
                    <label
                      className="col-sm-6 col-form-label"
                      htmlFor={field.formName}
                    >
                      {field.label}
                    </label>
                  ) : (
                    <span />
                  )}
                  <input
                    id={field.label && field.formName}
                    className={`col-${field.width ? field.width : 8} field`}
                    value={currentForm[field.formField]}
                    placeholder={!field.label ? field.name : ''}
                    type={field.type}
                    onChange={(e) =>
                      updateForm(formName, field.formField, e.target.value)
                    }
                  />
                </div>
              </div>
            ) : (
              <div key={i}>
                <div className="row justify-content-md-center">
                  {field.label}
                </div>
                <div className="space-evenly">
                  <label>
                    <input
                      type={'radio'}
                      value={'true'}
                      checked={currentForm[field.formField] === 'true'}
                      onChange={(e) =>
                        updateForm(formName, field.formField, e.target.value)
                      }
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type={'radio'}
                      value={'false'}
                      checked={currentForm[field.formField] === 'false'}
                      onChange={(e) =>
                        updateForm(formName, field.formField, e.target.value)
                      }
                    />
                    No
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="space-between button-holder">
          {altAction ? (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => altAction()}
            >
              {altActionName}
            </button>
          ) : (
            <div />
          )}
          {onSubmit ? (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                if (missing.length) {
                  showSnackbar(
                    `Please add the following items before continuing: ${missing.join(
                      ', ',
                    )}.`,
                  );
                } else {
                  onSubmit(currentForm);
                  clearOnSubmit && clearForm(formName);
                }
              }}
            >
              {submitName}
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ userReducer, paymentReducer, formReducer }) {
  return {
    ...formReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateForm, showSnackbar, clearForm }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
