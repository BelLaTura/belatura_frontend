export interface ISignInState {
  SignIn: {
    isNotVerify: boolean;
    isFetch: boolean;
    error: string | null;
  };
}

export enum SignInTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_IN_IS_NOT_VERIFY = 'SIGN_IN_IS_NOT_VERIFY',
  SIGN_IN_IS_FETCH = 'SIGN_IN_IS_FETCH',
  SIGN_IN_ERROR = 'SIGN_IN_ERROR',
}

interface ISignIn {
  type: SignInTypes.SIGN_IN;
}

interface ISignInIsNotVerify {
  type: SignInTypes.SIGN_IN_IS_NOT_VERIFY;
}

interface ISignInIsFetch {
  type: SignInTypes.SIGN_IN_IS_FETCH;
}

interface ISignInError {
  type: SignInTypes.SIGN_IN_ERROR;
  payload: string;
}

export type SignInAction =
  | ISignIn
  | ISignInIsNotVerify
  | ISignInIsFetch
  | ISignInError;
