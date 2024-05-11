export interface ISignUpState {
  SignUp: {
    isNotVerify: boolean;
    isFetch: boolean;
    error: string | null;
  };
}

export enum SignUpTypes {
  SIGN_UP = 'SIGN_UP',
  SIGN_UP_IS_NOT_VERIFY = 'SIGN_UP_IS_NOT_VERIFY',
  SIGN_UP_IS_FETCH = 'SIGN_UP_IS_FETCH',
  SIGN_UP_ERROR = 'SIGN_UP_ERROR',
}

interface ISignUp {
  type: SignUpTypes.SIGN_UP;
}

interface ISignUpIsNotVerify {
  type: SignUpTypes.SIGN_UP_IS_NOT_VERIFY;
}

interface ISignUpIsFetch {
  type: SignUpTypes.SIGN_UP_IS_FETCH;
}

interface ISignUpError {
  type: SignUpTypes.SIGN_UP_ERROR;
  payload: string;
}

export type SignUpAction =
  | ISignUp
  | ISignUpIsNotVerify
  | ISignUpIsFetch
  | ISignUpError;
