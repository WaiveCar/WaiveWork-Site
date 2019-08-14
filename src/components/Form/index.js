import React from 'react';
import Parser from 'html-react-parser';
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
    altAction,
    submitName,
    altActionName,
    showSnackbar,
    formWidth,
    title,
    body,
  } = props;
  const currentForm = props[formName];
  let missing = []; /*fields
    .map((item) => !currentForm[item.formField] && item.name)
    .filter((item) => item);*/
  return (
    <div className="container">
      <div className="align-center">
        {title && <div className="col-8 center-text">{title}</div>}
      </div>
      {body && <div className="align-center">{Parser(body)}</div>}
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
                <div className="align-center">{field.label}</div>
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
          {altAction && (
            <div className="align-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => altAction()}
              >
                {altActionName}
              </button>
            </div>
          )}
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
