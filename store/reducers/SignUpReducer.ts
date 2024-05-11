import { ISignUpState, SignUpAction, SignUpTypes } from './SignUpReducer.dto';

const defaultStore: ISignUpState = {
  SignUp: {
    isNotVerify: false,
    isFetch: false,
    error: null,
  },
};

export function SignUpReducer(
  state = defaultStore,
  action: SignUpAction,
): ISignUpState {
  switch (action.type) {
    case SignUpTypes.SIGN_UP:
      return {
        ...state,
        SignUp: {
          isNotVerify: false,
          isFetch: false,
          error: null,
        },
      };
    case SignUpTypes.SIGN_UP_IS_NOT_VERIFY:
      return {
        ...state,
        SignUp: {
          isNotVerify: true,
          isFetch: false,
          error: null,
        },
      };
    case SignUpTypes.SIGN_UP_IS_FETCH:
      return {
        ...state,
        SignUp: {
          isNotVerify: false,
          isFetch: true,
          error: null,
        },
      };
    case SignUpTypes.SIGN_UP_ERROR:
      return {
        ...state,
        SignUp: {
          isNotVerify: false,
          isFetch: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
