import React, { useState, useEffect } from 'react';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateForm, clearForm } from '../../store/actions/formActions';
import { handlePageChange } from '../../store/actions/formActions';
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
    handlePageChange,
  } = props;
  const currentForm = props[formName];
  let missing = fields
    .map((item) => !item.optional && !currentForm[item.formField] && item.name)
    .filter((item) => item);
  const formRef = React.createRef();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      handlePageChange(formRef.current);
    }
  });
  return (
    <form
      className={'needs-validation'}
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        if (formRef.current.checkValidity() === false) {
          e.stopPropagation();
          formRef.current.classList.add('was-validated');
          formRef.current
            .querySelectorAll('input')
            .forEach((one) => one.classList.add('input-focus'));
        } else {
          await onSubmit(currentForm);
          clearOnSubmit && clearForm(formName);
        }
      }}
      ref={formRef}
      className="form-holder mt-4"
    >
      <div className="d-flex justify-content-center">
        {title ? <h5 className="text-center ml-4 mr-4">{title}</h5> : <span />}
      </div>
      {body && (
        <div className="d-flex justify-content-center">{Parser(body)}</div>
      )}
      <div className="d-flex justify-content-center">
        <div className="inner-form">
          {fields.map((field, i) => {
            return field.type !== 'radio' ? (
              <div className="input-row form-group" key={i}>
                <div className={'d-flex justify-content-center row form-row'}>
                  {field.label ? (
                    <label
                      className={`col-sm-${
                        field.labelWidth ? field.labelWidth : 6
                      } col-form-label text-center`}
                      htmlFor={field.formName}
                    >
                      {field.label}
                    </label>
                  ) : (
                    <span />
                  )}
                  <div
                    className={`col-${field.width ? field.width : 8}`}
                    onInput={(e) => {
                      if (e.target.value) {
                        e.target.classList.add('input-focus');
                      }
                      if (e.target.checkValidity()) {
                        e.target.parentNode.classList.add('was-validated');
                        e.target.classList.add('is-valid');
                        e.target.nextSibling.classList.remove('display-block');
                        e.target.nextSibling.nextSibling.classList.add(
                          'display-block',
                        );
                      } else {
                        e.target.classList.remove('is-valid');
                        e.target.parentNode.classList.add('was-validated');
                        e.target.nextSibling.classList.add('display-block');
                        e.target.nextSibling.nextSibling.classList.remove(
                          'display-block',
                        );
                      }
                    }}
                  >
                    <input
                      id={field.label && field.formName}
                      className={'form-control'}
                      value={currentForm[field.formField]}
                      placeholder={!field.label ? field.name : ''}
                      type={field.type}
                      onChange={(e) =>
                        updateForm(formName, field.formField, e.target.value)
                      }
                      required={!field.optional}
                    />
                    <div className="invalid-feedback">
                      Please provide your {field.name}.
                    </div>
                    <div className="valid-feedback">{field.name}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={i}>
                <div className="d-flex justify-content-md-center mt-4">
                  {field.label}
                </div>
                <div className="space-evenly mt-2">
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
      <div className="d-flex justify-content-center">
        <div className="space-between button-holder mt-2">
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
            <button type="submit" className="btn btn-outline-primary">
              {submitName}
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </form>
  );
}

function mapStateToProps({ userReducer, paymentReducer, formReducer }) {
  return {
    ...formReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateForm, showSnackbar, clearForm, handlePageChange },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
