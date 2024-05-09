import Link from 'next/link';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import styles from '@/styles/SignUpPage.module.css';
import AppHead from '@/components/AppHead/AppHead';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';
import { BelaturaUserGetMyData } from '@/utils/fetch/belatura/users';
import { BelaturaUserGetMyDataBodyDto } from '@/types/belatura/api/users';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [data, setData] = useState<BelaturaUserGetMyDataBodyDto>({
    rs_address: '',
    rs_birthday: '',
    rs_email: '',
    rs_id: 0,
    rs_login: '',
    rs_middlename: '',
    rs_name: '',
    rs_phone: '',
    rs_ref: 0,
    rs_surname: '',
    rs_telegramNickname: '',
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('access') || '';
    if (accessToken.length === 0) {
      setIsLogin(false);
      return;
    }

    setIsLogin(true);
    (async function () {
      try {
        const jData = await BelaturaUserGetMyData();
        setData(jData.data);
        setIsLogin(true);
      } catch (exception) {
        if (
          exception instanceof AxiosError &&
          exception.response &&
          exception.response.status === 401
        ) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          return;
        }

        alert(exception);
        setIsLogin(false);
      }
    })();
  }, []);

  function logOut() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLogin(false);
  }

  if (isLogin) {
    return (
      <AppHead title="Моя страница" description="Моя страница">
        <AppWrapper>
          <div className={styles.form_margins}>
            <div className={styles.form}>
              <h1>Моя страница</h1>

              <div>
                <label className={styles.form__label}>Реферальная ссылка</label>
                <span className={styles.form__input}>
                  <a href={`https://bellatura.by/sign-up/ref/${data.rs_id}`}>
                    https://bellatura.by/sign-up/ref/{data.rs_id}
                  </a>
                </span>
              </div>
              <br />
              <div>
                <label className={styles.form__label}>Наставник</label>
                <span className={styles.form__input}>{data.rs_ref}</span>
              </div>
              <br />

              <div>
                <label className={styles.form__label}>Фамилия</label>
                <span className={styles.form__input}>{data.rs_surname}</span>
              </div>
              <div>
                <label className={styles.form__label}>Имя</label>
                <span className={styles.form__input}>{data.rs_name}</span>
              </div>
              <div>
                <label className={styles.form__label}>Отчество</label>
                <span className={styles.form__input}>{data.rs_middlename}</span>
              </div>
              <br />
              <div>
                <label className={styles.form__label}>Телефон</label>
                <span className={styles.form__input}>{data.rs_phone}</span>
              </div>

              <div>
                <label className={styles.form__label}>Город</label>
                <span className={styles.form__input}>{data.rs_address}</span>
              </div>
              <br />
              <div>
                <label className={styles.form__label}>Логин</label>
                <span className={styles.form__input}>{data.rs_login}</span>
              </div>
              <div>
                <label className={styles.form__label}>E-mail</label>
                <span className={styles.form__input}>{data.rs_email}</span>
              </div>
              <br />
              <div>
                <label className={styles.form__label}>Telegram</label>
                <span className={styles.form__input}>
                  {data.rs_telegramNickname ? (
                    <a href={`https://t.me/${data.rs_telegramNickname}`}>
                      https://t.me/{data.rs_telegramNickname}
                    </a>
                  ) : (
                    'не указан'
                  )}
                </span>
              </div>

              <button onClick={logOut} className={styles.form__button}>
                Выйти из аккаунта
              </button>
            </div>
          </div>
        </AppWrapper>
      </AppHead>
    );
  }

  return (
    <AppHead title="Моя страница" description="Моя страница">
      <AppWrapper>
        <AppContainer>
          <h1>Страница пользователя</h1>

          <h2>Вы не вошли в аккаунт</h2>

          <p style={{ textAlign: 'center' }}>
            <Link href="/sign-up">Регистрация</Link>
          </p>
          <p style={{ textAlign: 'center' }}>
            <Link href="/sign-in">Вход</Link>
          </p>
        </AppContainer>
      </AppWrapper>
    </AppHead>
  );
}
