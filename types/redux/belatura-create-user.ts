export interface BelaturaCreateUserState {
  createUserData: {
    loading: boolean;
    error: string | null;
  };
}

export enum BelaturaCreateUserTypes {
  BELATURA_CREATE_USER = 'BELATURA_CREATE_USER',
  BELATURA_CREATE_USER_SUCCESS = 'BELATURA_CREATE_USER_SUCCESS',
  BELATURA_CREATE_USER_ERROR = 'BELATURA_CREATE_USER_ERROR',
}

interface BelaturaCreateUser {
  type: BelaturaCreateUserTypes.BELATURA_CREATE_USER;
}

interface BelaturaCreateUserSuccess {
  type: BelaturaCreateUserTypes.BELATURA_CREATE_USER_SUCCESS;
}

interface BelaturaCreateUserError {
  type: BelaturaCreateUserTypes.BELATURA_CREATE_USER_ERROR;
  payload: string;
}

export type BelaturaCreateUserAction =
  | BelaturaCreateUser
  | BelaturaCreateUserSuccess
  | BelaturaCreateUserError;
