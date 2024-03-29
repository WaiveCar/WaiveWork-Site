const initialState = {
  selectedSignupPage: 0,
  loggedIn: false,
  authChecked: false,
  userResourcesLoaded: false,
  user: null,
  insuranceFile: null,
  license: null,
  signinOrganization: null,
};

function userReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'TOGGLE_LOGIN':
      return {
        ...state,
        loggedIn: payload.loggedIn,
      };
    case 'TOGGLE_AUTH_CHECKED':
      return {
        ...state,
        authChecked: payload.authChecked,
      };
    case 'CLEAR_FORM':
      return {
        ...state,
        [payload.formName]: { ...initialState[payload.formName] },
      };
    case 'CHANGE_SIGNUP_PAGE':
      return {
        ...state,
        selectedSignupPage: payload.selectedSignupPage,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: payload.user,
      };
    case 'UPDATE_INSURANCE':
      if (payload.insuranceFiles.length) {
        return {
          ...state,
          insuranceFile: payload.insuranceFiles[0],
        };
      } else {
        return {
          ...state,
          insuranceFiles: payload.insuranceFiles,
        };
      }
    case 'TOGGLE_USER_RESOURCES_LOADED':
      return {
        ...state,
        userResourcesLoaded: !state.userResourcesLoaded,
      };
    case 'UPDATE_LICENSE':
      return {
        ...state,
        license: payload.license,
      };
    case 'UPDATE_SIGNIN_ORG':
      return {
        ...state,
        signinOrganization: payload.signinOrganization,
      };
    default:
      return state;
  }
}

export default userReducer;
