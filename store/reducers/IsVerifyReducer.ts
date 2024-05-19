import {
  IVerifyState,
  VerifyAction,
  VerifyTypes,
} from '@/types/redux/is-verify';

const defaultStore: IVerifyState = {
  isVerify: false,
  isLoading: false,
  error: null,
};

export function VerifyReducer(
  state = defaultStore,
  action: VerifyAction,
): IVerifyState {
  switch (action.type) {
    case VerifyTypes.IS_VERIFY:
      return {
        ...state,
        isVerify: false,
        isLoading: false,
        error: null,
      };
    case VerifyTypes.IS_VERIFY_LOADING:
      return {
        ...state,
        isVerify: false,
        isLoading: true,
        error: null,
      };
    case VerifyTypes.IS_VERIFY_TRUE:
      return {
        ...state,
        isVerify: true,
        isLoading: false,
        error: null,
      };
    case VerifyTypes.IS_VERIFY_FALSE:
      return {
        ...state,
        isVerify: false,
        isLoading: false,
        error: null,
      };
    case VerifyTypes.IS_VERIFY_ERROR:
      return {
        ...state,
        isVerify: false,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
