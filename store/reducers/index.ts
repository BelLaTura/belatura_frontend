import { combineReducers } from 'redux';
import { SignInReducer } from './SignInReducer';
import { SignUpReducer } from './SignUpReducer';
import { VerifyReducer } from './IsVerifyReducer';
import { UserGetByIdReducer } from './UserGetById';

export const rootReducer = combineReducers({
  SignInReducer,
  SignUpReducer,
  VerifyReducer,
  UserGetByIdReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
