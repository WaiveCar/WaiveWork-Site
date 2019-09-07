import signupForm from '../../components/Form/signupForm';
import loginForm from '../../components/Form/loginForm';
import authFormTemplate from '../../components/Form/authFormTemplate';
import paymentForm from '../../components/Form/paymentForm';
import paymentFormTemplate from '../../components/Form/paymentFormTemplate';
import personalForm from '../../components/Form/personalForm';
import personalFormTemplate from '../../components/Form/personalFormTemplate';
import passwordForm from '../../components/Form/passwordForm';
import passwordFormTemplate from '../../components/Form/passwordFormTemplate';

const initialState = {
  authForm: { ...authFormTemplate },
  loginFormFields: loginForm,
  signupFormPages: signupForm,
  paymentForm: { ...paymentFormTemplate },
  paymentFormFields: paymentForm,
  personalForm: { ...personalFormTemplate },
  personalFormFields: personalForm,
  passwordForm: { ...passwordFormTemplate },
  passwordFormFields: passwordForm,
};

function formReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'UPDATE_FORM':
      const { form } = state;
      return {
        ...state,
        [payload.formName]: {
          ...state[payload.formName],
          [payload.field]: payload.value,
        },
      };
    default:
      return state;
  }
}

export default formReducer;
