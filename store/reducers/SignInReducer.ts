import { ISignInState, SignInAction, SignInTypes } from './SignInReducer.dto';

const defaultStore: ISignInState = {
  SignIn: {
    isNotVerify: false,
    isFetch: false,
    error: null,
  },
};

export function SignInReducer(
  state = defaultStore,
  action: SignInAction,
): ISignInState {
  switch (action.type) {
    case SignInTypes.SIGN_IN:
      return {
        ...state,
        SignIn: {
          isNotVerify: false,
          isFetch: false,
          error: null,
        },
      };
    case SignInTypes.SIGN_IN_IS_NOT_VERIFY:
      return {
        ...state,
        SignIn: {
          isNotVerify: true,
          isFetch: false,
          error: null,
        },
      };
    case SignInTypes.SIGN_IN_IS_FETCH:
      return {
        ...state,
        SignIn: {
          isNotVerify: false,
          isFetch: true,
          error: null,
        },
      };
    case SignInTypes.SIGN_IN_ERROR:
      return {
        ...state,
        SignIn: {
          isNotVerify: false,
          isFetch: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
