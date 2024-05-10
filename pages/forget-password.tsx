import { useState } from 'react';
import { AxiosError } from 'axios';
import AppHead from '@/components/AppHead/AppHead';
import styles from '@/styles/SignUpPage.module.css';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import { BellaturaUserForgetPassword } from '@/utils/fetch/belatura/users';

export default function ForgetPasswordPage() {
  const [logintOrEmail, setLoginOrEmail] = useState<string>('');

  async function forgetPassword() {
    if (logintOrEmail.length === 0) {
      alert('Вы не указали логин или почту');
      return;
    }

    try {
      const jData = await BellaturaUserForgetPassword(logintOrEmail);
      alert(jData.message);
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

      alert(exception);
    }
  }

  return (
    <AppHead title="Забыли пароль" description="Забыли пароль">
      <AppWrapper>
        <div className={styles.form_margins}>
          <div className={styles.form}>
            <h1>Забыли пароль</h1>
            <div>
              <label className={styles.form__label} htmlFor="loginOrEmail">
                Логин или email
              </label>
              <input
                className={styles.form__input}
                id="loginOrEmail"
                type="text"
                placeholder="Логин или E-mail"
                value={logintOrEmail}
                onChange={(event) => setLoginOrEmail(event.target.value)}
              />
            </div>
            <button className={styles.form__button} onClick={forgetPassword}>
              Получить новый пароль на почту
            </button>
          </div>
        </div>
      </AppWrapper>
    </AppHead>
  );
}
