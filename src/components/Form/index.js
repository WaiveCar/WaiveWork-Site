import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateForm } from '../../store/actions/userActions';
import './form.scss';

function Form(props) {
  const {
    fields,
    formName,
    updateForm,
    onSubmit,
    submitName,
    formWidth,
  } = props;
  const currentForm = props[formName];
  return (
    <form className="align-center">
      <div className="inner-form">
        {fields.map((field, i) => {
          let Svg = field.svg;
          return (
            <div className="input-row" key={i}>
              <Svg className="input-icon" />
              <div className={'row align-center'}>
                <input
                  className={`col-${field.width ? field.width : 12} field`}
                  value={currentForm[field.formField]}
                  placeholder={field.name}
                  type={field.type}
                  onChange={(e) =>
                    updateForm(formName, field.fieldName, e.target.value)
                  }
                />
              </div>
            </div>
          );
        })}
        {onSubmit && (
          <div className="align-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSubmit(currentForm)}
            >
              {submitName}
            </button>
          </div>
        )}
      </div>
    </form>
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
