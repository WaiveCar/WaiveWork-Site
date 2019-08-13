import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateForm } from '../../store/actions/userActions';
import { showSnackbar } from '../../store/actions/snackbarActions';
import './form.scss';

function Form(props) {
  const {
    fields,
    formName,
    updateForm,
    onSubmit,
    submitName,
    showSnackbar,
    formWidth,
    title,
  } = props;
  const currentForm = props[formName];
  let missing = []; /*fields
    .map((item) => !currentForm[item.formField] && item.name)
    .filter((item) => item);*/
  return (
    <div>
      <div className="align-center">{title && <div>{title}</div>}</div>
      <div className="align-center">
        <div className="inner-form">
          {fields.map((field, i) => {
            return field.type !== 'radio' ? (
              <div className="input-row" key={i}>
                <div className={'row align-center'}>
                  {field.label && (
                    <label
                      className="col-sm-6 col-form-label"
                      htmlFor={field.formName}
                    >
                      {field.label}
                    </label>
                  )}
                  <input
                    id={field.label && field.formName}
                    className={`col-${field.width ? field.width : 12} field`}
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
                <div className="align-center">{field.label}</div>
                <div className="space-evenly">
                  <label>
                    <input
                      type={'radio'}
                      value={'yes'}
                      checked={currentForm[field.formField] === 'yes'}
                      onChange={(e) =>
                        updateForm(formName, field.formField, e.target.value)
                      }
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type={'radio'}
                      value={'no'}
                      checked={currentForm[field.formField] === 'no'}
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
          {onSubmit && (
            <div className="align-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  missing.length
                    ? showSnackbar(
                        `Please add the following items before continuing: ${missing.join(
                          ', ',
                        )}.`,
                      )
                    : onSubmit(currentForm)
                }
              >
                {submitName}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ userReducer }) {
  return {
    ...userReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateForm: bindActionCreators(updateForm, dispatch),
    showSnackbar: bindActionCreators(showSnackbar, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
