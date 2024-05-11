import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { ISignInState } from './reducers/SignInReducer.dto';
import { ISignUpState } from './reducers/SignUpReducer.dto';
import { IUserGetByIdState } from './reducers/UserGetById.dto';

export interface RootStoreDto {
  SignInReducer: ISignInState;
  SignUpReducer: ISignUpState;
  UserGetByIdReducer: IUserGetByIdState;
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Включаем Thunk Middleware в список middleware
});
