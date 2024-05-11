import {
  IUserGetByIdState,
  UserGetByIdAction,
  UserGetByIdTypes,
} from './UserGetById.dto';
import { emptyBellaturaUserGetDto } from '@/types/belatura/api/users';

const defaultStore: IUserGetByIdState = {
  UserById: {
    isFetch: false,
    isNotFound: false,
    data: emptyBellaturaUserGetDto,
    error: null,
  },
};

export function UserGetByIdReducer(
  state = defaultStore,
  action: UserGetByIdAction,
): IUserGetByIdState {
  switch (action.type) {
    case UserGetByIdTypes.USER_GET_BY_ID:
      return {
        ...state,
        UserById: {
          isFetch: false,
          isNotFound: false,
          data: emptyBellaturaUserGetDto,
          error: null,
        },
      };
    case UserGetByIdTypes.USER_GET_BY_ID_IS_FETCH:
      return {
        ...state,
        UserById: {
          isFetch: true,
          isNotFound: false,
          data: emptyBellaturaUserGetDto,
          error: null,
        },
      };
    case UserGetByIdTypes.USER_GET_BY_ID_IS_NOT_FOUND:
      return {
        ...state,
        UserById: {
          isFetch: false,
          isNotFound: true,
          data: emptyBellaturaUserGetDto,
          error: null,
        },
      };
    case UserGetByIdTypes.USER_GET_BY_ID_SUCCESS:
      return {
        ...state,
        UserById: {
          isFetch: false,
          isNotFound: false,
          data: action.payload,
          error: null,
        },
      };
    case UserGetByIdTypes.USER_GET_BY_ID_ERROR:
      return {
        ...state,
        UserById: {
          isFetch: false,
          isNotFound: false,
          data: emptyBellaturaUserGetDto,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
