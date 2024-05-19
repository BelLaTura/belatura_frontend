export interface IVerifyState {
  isVerify: boolean;
  isLoading: boolean;
  error: null | string;
}

export enum VerifyTypes {
  IS_VERIFY = 'IS_VERIFY',
  IS_VERIFY_LOADING = 'IS_VERIFY_LOADING',
  IS_VERIFY_TRUE = 'IS_VERIFY_TRUE',
  IS_VERIFY_FALSE = 'IS_VERIFY_FALSE',
  IS_VERIFY_ERROR = 'IS_VERIFY_ERROR',
}

interface IVerify {
  type: VerifyTypes.IS_VERIFY;
}

interface IVerifyLoading {
  type: VerifyTypes.IS_VERIFY_LOADING;
}

interface IVerifyTrue {
  type: VerifyTypes.IS_VERIFY_TRUE;
}

interface IVerifyFalse {
  type: VerifyTypes.IS_VERIFY_FALSE;
}

interface IVerifyError {
  type: VerifyTypes.IS_VERIFY_ERROR;
  payload: string;
}

export type VerifyAction =
  | IVerify
  | IVerifyLoading
  | IVerifyTrue
  | IVerifyFalse
  | IVerifyError;
