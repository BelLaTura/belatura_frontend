import Link from 'next/link';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import AppHead from '@/components/AppHead/AppHead';
import styles from '@/styles/SignUpPage.module.css';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import { BellaturaSessionCreate } from '@/utils/fetch/belatura/sessions';
import {
  BellaturaSessionCreateBodyDto,
  emptyBellaturaSessionCreateBody,
} from '@/types/belatura/api/sessions.dto';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootStoreDto } from '@/store';
import { SignUpTypes } from '@/store/reducers/SignUpReducer.dto';

export default function SignIn() {
  const route = useRouter();
  const [data, setData] = useState<BellaturaSessionCreateBodyDto>(
    emptyBellaturaSessionCreateBody,
  );
  const dispatch = useDispatch();
  const SignUpData = useSelector(
    (state: RootStoreDto) => state.SignUpReducer.SignUp,
  );

  async function login() {
    if (data.rs_loginOrEmail.length === 0) {
      dispatch({ type: SignUpTypes.SIGN_UP_IS_NOT_VERIFY });
      alert('Вы не указали логин или электронную почту');
      return;
    }

    if (data.rs_password.length === 0) {
      dispatch({ type: SignUpTypes.SIGN_UP_IS_NOT_VERIFY });
      alert('Вы не указали пароль');
      return;
    }

    try {
      dispatch({ type: SignUpTypes.SIGN_UP });
      dispatch({ type: SignUpTypes.SIGN_UP_IS_FETCH });
      const response = await BellaturaSessionCreate(data);
      dispatch({ type: SignUpTypes.SIGN_UP });
      const DATA = response.data;
      const accessToken = DATA.rs_accessToken;
      const refreshToken = DATA.rs_refreshToken;
      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);
      route.replace('/account');
    } catch (exception) {
      dispatch({ type: SignUpTypes.SIGN_UP_ERROR, payload: `${exception}` });
      if (
        exception instanceof AxiosError &&
        exception.response &&
        exception.response.status === 400
      ) {
        const message = exception.response.data.message;
        alert(message);
        return;
      }

      if (
        exception instanceof AxiosError &&
        exception.response &&
        exception.response.status === 409
      ) {
        const message = exception.response.data.message;
        alert(message);
        return;
      }

      if (exception instanceof AxiosError && exception.response) {
        alert(
          `HTTP status: ${exception.response.status}\nMethod: POST\nURL: /api/v1/sessions\nПередайте эти данные программисту`,
        );
        return;
      }

      alert('' + exception);
    }
  }

  return (
    <AppHead title="Вход" description="Вход">
      <AppWrapper>
        <div className={styles.form_margins}>
          <div className={styles.form}>
            <h1>Войти в аккаунт</h1>
            <div>
              <label className={styles.form__label} htmlFor="loginOrEmail">
                Логин или email
              </label>
              <input
                className={styles.form__input}
                id="loginOrEmail"
                type="text"
                placeholder="Логин"
                value={data.rs_loginOrEmail}
                onChange={(event) =>
                  setData({ ...data, rs_loginOrEmail: event.target.value })
                }
              />
            </div>
            <div>
              <label className={styles.form__label} htmlFor="password">
                Пароль
              </label>
              <input
                className={styles.form__input}
                id="password"
                type="password"
                placeholder="Пароль"
                value={data.rs_password}
                onChange={(event) =>
                  setData({ ...data, rs_password: event.target.value })
                }
              />
            </div>
            <button
              className={styles.form__button}
              onClick={login}
              disabled={SignUpData.isFetch}>
              {SignUpData.isFetch ? 'Данные отправляются...' : 'Ввойти'}
            </button>
            <Link className={styles.from__a} href="/sign-up">
              У меня нет аккаунта
            </Link>
            <Link className={styles.from__a} href="/forget-password">
              Забыли пароль
            </Link>
            {SignUpData.isNotVerify ? (
              <p style={{ color: 'lightgray' }}>...</p>
            ) : SignUpData.isFetch ? (
              <p style={{ color: 'lightgray' }}>Отправка данных</p>
            ) : SignUpData.error ? (
              <p style={{ color: 'red' }}>{SignUpData.error}</p>
            ) : null}
          </div>
        </div>
      </AppWrapper>
    </AppHead>
  );
}
