import React, { useState, useEffect } from 'react';
import Field from './Field';
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
    progress,
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
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        if (formRef.current.checkValidity() === false) {
          e.stopPropagation();
          formRef.current.classList.add('was-validated');
          formRef.current.querySelectorAll('input').forEach((one) => {
            one.classList.add('input-focus');
            if (one.nextSibling.classList) {
              one.nextSibling.classList.remove('display-block');
            }
          });
        } else {
          formRef.current.querySelectorAll('input').forEach((one) => {
            one.classList.add('input-focus');
            if (one.nextSibling && one.nextSibling.classList) {
              one.nextSibling.classList.remove('display-block');
            }
          });
          try {
            await onSubmit(currentForm);
            clearOnSubmit && clearForm(formName);
          } catch (e) {}
        }
      }}
      ref={formRef}
      className="form-holder mt-4 needs-validation"
    >
      <div className="d-flex justify-content-center row">
        {title ? (
          <h4 className="text-center ml-4 mr-4 form-title">{title}</h4>
        ) : (
          <span />
        )}
      </div>
      {progress && progress()}
      {body && (
        <div className="d-flex justify-content-center">{Parser(body)}</div>
      )}
      <div className="d-flex justify-content-center">
        <div className="inner-form">
          {fields.map((field, i) => {
            return field.type !== 'radio' ? (
              <div className="input-row" key={i}>
                <div className={'d-flex justify-content-center row form-row'}>
                  {field.label ? (
                    <label
                      className={`col-sm-${
                        field.labelWidth ? field.labelWidth : 6
                      } col-form-label`}
                      htmlFor={field.formName}
                    >
                      {field.label}
                    </label>
                  ) : (
                    <span />
                  )}
                  {!Array.isArray(field) ? (
                    <Field
                      field={field}
                      currentForm={currentForm}
                      updateForm={updateForm}
                      formName={formName}
                    />
                  ) : (
                    field.map((each, i) => (
                      <Field
                        key={i}
                        field={each}
                        currentForm={currentForm}
                        updateForm={updateForm}
                        formName={formName}
                      />
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div key={i}>
                <div className="mt-4">{field.label}</div>
                <div className="mt-2 radio-holder">
                  <div>
                    <input
                      type={'radio'}
                      value={'true'}
                      id={`${field.formField}-yes`}
                      checked={currentForm[field.formField] === 'true'}
                      onChange={(e) =>
                        updateForm(formName, field.formField, e.target.value)
                      }
                    />
                    <label htmlFor={`${field.formField}-yes`}>
                      <span className="ml-2">Yes</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type={'radio'}
                      value={'false'}
                      id={`${field.formField}-no`}
                      checked={currentForm[field.formField] === 'false'}
                      onChange={(e) =>
                        updateForm(formName, field.formField, e.target.value)
                      }
                    />
                    <label htmlFor={`${field.formField}-no`}>
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="d-flex space-between button-holder mt-3">
          {altAction ? (
            <button
              type="button"
              className="btn btn-warning btn-half"
              onClick={() => altAction()}
            >
              {altActionName}
            </button>
          ) : (
            <div />
          )}
          {onSubmit ? (
            <button
              type="submit"
              className={`btn btn-primary ${
                altAction ? 'btn-half' : 'btn-full'
              }`}
            >
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
