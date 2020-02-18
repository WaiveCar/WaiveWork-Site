import React from 'react';

function Field({ field, currentForm, updateForm, formName }) {
  console.log(field);
  return (
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
          e.target.nextSibling.nextSibling.classList.add('display-block');
        } else {
          e.target.classList.remove('is-valid');
          e.target.parentNode.classList.add('was-validated');
          e.target.nextSibling.classList.add('display-block');
          e.target.nextSibling.nextSibling.classList.remove('display-block');
        }
      }}
    >
      {field.type !== 'date' ? (
        <input
          id={field.label && field.formName}
          className={'form-control'}
          value={currentForm[field.formField]}
          placeholder={field.name}
          type={field.type}
          onChange={(e) =>
            updateForm(formName, field.formField, e.target.value)
          }
          required={!field.optional}
        />
      ) : (
        <input
          className={'form-control'}
          value={currentForm[field.formField]}
          placeholder={field.name}
          type={'text'}
          onChange={(e) =>
            updateForm(formName, field.formField, e.target.value)
          }
          onFocus={(e) => (e.target.type = 'date')}
          required={!field.optional}
        />
      )}
      <div className="invalid-feedback">Please provide your {field.name}.</div>
      <div className="valid-feedback">{field.name}</div>
    </div>
  );
}

export default Field;
