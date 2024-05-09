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

export default function SignIn() {
  const route = useRouter();
  const [data, setData] = useState<BellaturaSessionCreateBodyDto>(
    emptyBellaturaSessionCreateBody,
  );

  async function login() {
    try {
      const response = await BellaturaSessionCreate(data);
      const DATA = response.data;
      const accessToken = DATA.rs_accessToken;
      const refreshToken = DATA.rs_refreshToken;
      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);
      route.replace('/account');
    } catch (exception) {
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

      alert('' + exception);
    }
  }

  return (
    <AppHead title="Вход" description="Вход">
      <AppWrapper>
        <div className={styles.form_margins}>
          <div className={styles.form}>
            <h1>Ввойти в аккаунт</h1>
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
            <button className={styles.form__button} onClick={login}>
              Ввойти
            </button>
            <Link className={styles.from__a} href="/sign-up">
              У меня нет аккаунта
            </Link>
            <Link className={styles.from__a} href="/forget-password">
              Забыли пароль
            </Link>
          </div>
        </div>
      </AppWrapper>
    </AppHead>
  );
}
