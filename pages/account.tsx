import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  BellaturaUserGetMyDataBodyDto,
  emptyBellaturaUserGetMyDataBodyDto,
} from '@/types/belatura/api/users';
import AppEnv from '@/utils/app-env';
import { RootStoreDto } from '@/store';
import AppHead from '@/components/AppHead/AppHead';
import styles from '@/styles/SignUpPage.module.css';
import { VerifyTypes } from '@/types/redux/is-verify';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';
import { BellaturaUserGetMyData } from '@/utils/fetch/belatura/users';
import IsNotAuthBlock from '@/components/IsNotAuthBlock/IsNotAuthBlock';
import { BellaturaSessionIsVerify } from '@/utils/fetch/belatura/sessions';
import AppColorPostBlock from '@/components/AppColorPostBlock/AppColorPostBlock';

const SEO_TITLE = 'Моя страница';
const SEO_DESCRIPTION = 'Моя страница';

export default function AccountPage() {
  const dispatch = useDispatch();
  const VerifyData = useSelector((state: RootStoreDto) => state.VerifyReducer);

  const [data, setData] = useState<BellaturaUserGetMyDataBodyDto>(
    emptyBellaturaUserGetMyDataBodyDto,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        await BellaturaSessionIsVerify();
        setIsLoading(false);
        dispatch({ type: VerifyTypes.IS_VERIFY_TRUE });
      } catch (exception) {
        setIsLoading(false);
        if (
          exception instanceof AxiosError &&
          exception.response &&
          exception.response.status === 401
        ) {
          dispatch({ type: VerifyTypes.IS_VERIFY_FALSE });
          return;
        }

        return;
      }

      try {
        setIsLoading(true);
        const jRefData = await BellaturaUserGetMyData();
        setIsLoading(false);
        setData(jRefData.data);
      } catch (exception) {
        alert(exception);
        return;
      }
    })();
  }, []);

  function logOut() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    dispatch({ type: VerifyTypes.IS_VERIFY_FALSE });
  }

  if (isLoading) {
    return (
      <AppHead title={SEO_TITLE} description={SEO_DESCRIPTION}>
        <AppWrapper>
          <AppContainer>
            <AppColorPostBlock>
              <p>Загрузка данных...</p>
            </AppColorPostBlock>
          </AppContainer>
        </AppWrapper>
      </AppHead>
    );
  }

  if (VerifyData.isVerify) {
    const {
      rs_address: address,
      rs_birthday: birthday,
      rs_email: email,
      rs_id: id,
      rs_login: login,
      rs_middlename: middlename,
      rs_name: name,
      rs_phone: phone,
      rs_ref: ref,
      rs_surname: surname,
      rs_telegramNickname: teleram,
    } = data;

    const telegramNickname = teleram
      .replace('@', '')
      .replace('https://t.me/', '');
    const telegramLink = `https://t.me/${telegramNickname}`;

    const bd_date = new Date(birthday);
    const bd_YYYY = bd_date.getFullYear();
    const bd_MM = ('' + (bd_date.getMonth() + 1)).padStart(2, '0');
    const bd_DD = ('' + bd_date.getDate()).padStart(2, '0');
    const birthday_string = `${bd_YYYY}.${bd_MM}.${bd_DD}`;

    return (
      <AppHead title={SEO_TITLE} description={SEO_DESCRIPTION}>
        <AppWrapper>
          <AppContainer>
            <AppColorPostBlock>
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
              <div className={styles.app__table_wrapper}>
                <table className={styles.app__table}>
                  <tbody>
                    <tr>
                      <td>Мой ID</td>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <td style={{ border: 0 }}></td>
                      <td style={{ border: 0 }}></td>
                    </tr>
                    <tr>
                      <td>Фамилия</td>
                      <td>{surname}</td>
                    </tr>
                    <tr>
                      <td>Имя</td>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <td>Отчество</td>
                      <td>{middlename}</td>
                    </tr>
                    <tr>
                      <td>Дата рождения</td>
                      <td>{birthday_string}</td>
                    </tr>
                    <tr>
                      <td style={{ border: 0 }}></td>
                      <td style={{ border: 0 }}></td>
                    </tr>
                    <tr>
                      <td>Телефон</td>
                      <td>{phone}</td>
                    </tr>
                    <tr>
                      <td>Город</td>
                      <td>{address}</td>
                    </tr>
                    <tr>
                      <td style={{ border: 0 }}></td>
                      <td style={{ border: 0 }}></td>
                    </tr>
                    <tr>
                      <td>Логин</td>
                      <td>{login}</td>
                    </tr>
                    <tr>
                      <td>E-mail</td>
                      <td>
                        <a href={`mailto:${email}`}>{email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Telegram</td>
                      <td>
                        {telegramNickname.length === 0 ? (
                          'не указан'
                        ) : (
                          <a href={telegramLink}>{telegramNickname}</a>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button onClick={logOut} className={styles.form__button}>
                Выйти из аккаунта
              </button>
            </AppColorPostBlock>
          </AppContainer>
        </AppWrapper>
      </AppHead>
    );
  }

  return (
    <AppHead title={SEO_TITLE} description={SEO_DESCRIPTION}>
      <IsNotAuthBlock />
    </AppHead>
  );
}
