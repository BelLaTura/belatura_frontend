import { combineReducers } from 'redux';
import { SignInReducer } from './SignInReducer';
import { SignUpReducer } from './SignUpReducer';
import { UserGetByIdReducer } from './UserGetById';

export const rootReducer = combineReducers({
  SignInReducer,
  SignUpReducer,
  UserGetByIdReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
