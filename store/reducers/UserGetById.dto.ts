import { BellaturaUserGetDto } from '@/types/belatura/api/users';

export interface IUserGetByIdState {
  UserById: {
    isFetch: boolean;
    isNotFound: boolean;
    data: BellaturaUserGetDto;
    error: string | null;
  };
}

export enum UserGetByIdTypes {
  USER_GET_BY_ID = 'USER_GET_BY_ID',
  USER_GET_BY_ID_IS_FETCH = 'USER_GET_BY_ID_IS_FETCH',
  USER_GET_BY_ID_IS_NOT_FOUND = 'USER_GET_BY_ID_IS_NOT_FOUND',
  USER_GET_BY_ID_SUCCESS = 'USER_GET_BY_ID_SUCCESS',
  USER_GET_BY_ID_ERROR = 'USER_GET_BY_ID_ERROR',
}

interface IUserGetById {
  type: UserGetByIdTypes.USER_GET_BY_ID;
}

interface IUserGetByIdIsFetch {
  type: UserGetByIdTypes.USER_GET_BY_ID_IS_FETCH;
}

interface IUserGetByIdIsNotFound {
  type: UserGetByIdTypes.USER_GET_BY_ID_IS_NOT_FOUND;
}

interface IUserGetByIdSuccess {
  type: UserGetByIdTypes.USER_GET_BY_ID_SUCCESS;
  payload: BellaturaUserGetDto;
}

interface IUserGetByIdError {
  type: UserGetByIdTypes.USER_GET_BY_ID_ERROR;
  payload: string;
}

export type UserGetByIdAction =
  | IUserGetById
  | IUserGetByIdIsFetch
  | IUserGetByIdIsNotFound
  | IUserGetByIdSuccess
  | IUserGetByIdError;
