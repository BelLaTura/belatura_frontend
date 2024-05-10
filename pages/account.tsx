import Link from 'next/link';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AppEnv from '@/utils/app-env';
import styles from '@/styles/SignUpPage.module.css';
import AppHead from '@/components/AppHead/AppHead';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';
import {
  BellaturaUserGetDto,
  BellaturaUserGetMyDataBodyDto,
  emptyBellaturaUserGetDto,
} from '@/types/belatura/api/users';
import {
  BellaturaUserFindOneById,
  BellaturaUserGetMyData,
} from '@/utils/fetch/belatura/users';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [data, setData] = useState<BellaturaUserGetMyDataBodyDto>({
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
  const [refData, setRefData] = useState<BellaturaUserGetDto>(
    emptyBellaturaUserGetDto,
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('access') || '';
    if (accessToken.length === 0) {
      setIsLogin(false);
      return;
    }

    setIsLogin(true);
    (async function () {
      let ref = 0;
      try {
        const jData = await BellaturaUserGetMyData();
        setData(jData.data);
        setIsLogin(true);
        ref = jData.data.rs_ref;
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

      try {
        const jRefData = await BellaturaUserFindOneById(ref);
        setRefData(jRefData.data);
      } catch (exception) {
        if (
          exception instanceof AxiosError &&
          exception.response &&
          exception.response.status === 404
        ) {
          setRefData(emptyBellaturaUserGetDto);
          return;
        }
        alert(exception);
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

              <h3>Реферальная ссылка</h3>
              <div>
                <a href={`${AppEnv.WEBSITE}/sign-up/ref/${data.rs_id}`}>
                  {AppEnv.WEBSITE}/sign-up/ref/{data.rs_id}
                </a>
              </div>
              <CopyToClipboard
                text={`${AppEnv.WEBSITE}/sign-up/ref/${data.rs_id}`}
                onCopy={() =>
                  alert(
                    `Скопирована реферальная ссылка:\n${AppEnv.WEBSITE}/sign-up/ref/${data.rs_id}`,
                  )
                }>
                <button className={styles.form__button}>
                  Скопировать ссылку
                </button>
              </CopyToClipboard>

              <h3>Данные аккаунта</h3>
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <td>Наставник</td>
                    <td>
                      {[
                        refData.rs_surname,
                        refData.rs_name,
                        refData.rs_middlename,
                      ]
                        .filter((e) => e.length > 0)
                        .join(' ') || 'Нет'}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: 0 }}></td>
                    <td style={{ border: 0 }}></td>
                  </tr>
                  <tr>
                    <td>Фамилия</td>
                    <td>{data.rs_surname}</td>
                  </tr>
                  <tr>
                    <td>Имя</td>
                    <td>{data.rs_name}</td>
                  </tr>
                  <tr>
                    <td>Отчество</td>
                    <td>{data.rs_middlename}</td>
                  </tr>
                  <tr>
                    <td style={{ border: 0 }}></td>
                    <td style={{ border: 0 }}></td>
                  </tr>
                  <tr>
                    <td>Телефон</td>
                    <td>{data.rs_phone}</td>
                  </tr>
                  <tr>
                    <td>Город</td>
                    <td>{data.rs_address}</td>
                  </tr>
                  <tr>
                    <td style={{ border: 0 }}></td>
                    <td style={{ border: 0 }}></td>
                  </tr>
                  <tr>
                    <td>Логин</td>
                    <td>{data.rs_login}</td>
                  </tr>
                  <tr>
                    <td>E-mail</td>
                    <td>
                      <a href={`mailto:${data.rs_email}`}>{data.rs_email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Telegram</td>
                    <td>
                      <a href={`http://t.me/${data.rs_telegramNickname}`}>
                        {data.rs_telegramNickname}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

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
