import Link from 'next/link';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BellaturaUserCreateBodyDto,
  BellaturaUserGetDto,
  emptyBelaturaUserCreate,
  emptyBellaturaUserGetDto,
} from '@/types/belatura/api/users';
import {
  BellaturaUserFindOneById,
  BellatureUserCreate,
} from '@/utils/fetch/belatura/users';
import { RootStoreDto } from '@/store';
import AppHead from '@/components/AppHead/AppHead';
import styles from '@/styles/SignUpPage.module.css';
import DateInput from '@/components/DateInput/DateInput';
import PhoneInput from '@/components/PhoneInput/PhoneInput';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import { SignInTypes } from '@/store/reducers/SignInReducer.dto';
import { UserGetByIdTypes } from '@/store/reducers/UserGetById.dto';
import { BellaturaSessionCreate } from '@/utils/fetch/belatura/sessions';
import { NominatimOpenstreetmapOrgGetAddress } from '@/utils/fetch/nominatim.openstreetmap.org/getAddress';

export default function SignUpRefPage() {
  const route = useRouter();
  const { ref } = route.query;
  const [addresses, setAddresses] = useState<string[]>([]);

  const [data, setData] = useState<BellaturaUserCreateBodyDto>(
    emptyBelaturaUserCreate,
  );
  const [userData, setUserData] = useState<BellaturaUserGetDto>(
    emptyBellaturaUserGetDto,
  );

  const dispatch = useDispatch();
  const SignInData = useSelector(
    (state: RootStoreDto) => state.SignInReducer.SignIn,
  );
  const UserGetByIdData = useSelector(
    (state: RootStoreDto) => state.UserGetByIdReducer.UserById,
  );

  useEffect(() => {
    const number = Number(ref) || -1;
    setData({ ...data, rs_ref: number });
  }, [ref]);

  useEffect(() => {
    (async function () {
      const ref = data.rs_ref;
      if (ref === -1) return;
      try {
        dispatch({ type: UserGetByIdTypes.USER_GET_BY_ID });
        dispatch({ type: UserGetByIdTypes.USER_GET_BY_ID_IS_FETCH });
        const userData = await BellaturaUserFindOneById(ref);
        console.log(userData.data);
        dispatch({
          type: UserGetByIdTypes.USER_GET_BY_ID_SUCCESS,
          payload: userData.data,
        });
        setUserData(userData.data);
      } catch (exception) {
        dispatch({
          type: UserGetByIdTypes.USER_GET_BY_ID_ERROR,
          payload: `${exception}`,
        });
        if (
          exception instanceof AxiosError &&
          exception.response &&
          exception.response.status === 404
        ) {
          dispatch({ type: UserGetByIdTypes.USER_GET_BY_ID_IS_NOT_FOUND });
        }
      }
    })();
  }, [data.rs_ref]);

  useEffect(() => {
    (async function () {
      const address = data.rs_address;
      if (address.length === 0) {
        return;
      }

      const jAddreses = await NominatimOpenstreetmapOrgGetAddress(address);
      setAddresses(jAddreses);
    })();
  }, [data.rs_address]);

  async function isNotOkCheck() {
    try {
      await BellaturaUserFindOneById(data.rs_ref);
    } catch (exception) {
      if (
        exception instanceof AxiosError &&
        exception.response &&
        exception.response.status === 404
      ) {
        alert('Вы не выбрали наставника');
        return true;
      }
    }

    if (data.rs_surname.length === 0) {
      alert('Вы не указали фамилию');
      return true;
    }

    if (data.rs_name.length === 0) {
      alert('Вы не указали имя');
      return true;
    }

    if (data.rs_name.length === 0) {
      alert('Вы не указали имя');
      return true;
    }

    if (data.rs_phone.length === 0) {
      alert('Вы не указали телефон');
      return true;
    }

    if (data.rs_address.length === 0) {
      alert('Вы не указали адрес');
      return true;
    }

    if (data.rs_email.length === 0) {
      alert('Вы не указали email');
      return true;
    }

    if (data.rs_login.length === 0) {
      alert('Вы не указали логин');
      return true;
    }

    if (data.rs_password.length === 0) {
      alert('Вы не указали пароль');
      return true;
    }

    return false;
  }

  async function createUser() {
    try {
      dispatch({ type: SignInTypes.SIGN_IN });

      if (await isNotOkCheck()) {
        dispatch({ type: SignInTypes.SIGN_IN_IS_NOT_VERIFY });
        return;
      }

      dispatch({ type: SignInTypes.SIGN_IN_IS_FETCH });
      const json = await BellatureUserCreate(data);
      dispatch({ type: SignInTypes.SIGN_IN });
      const jSession = await BellaturaSessionCreate({
        rs_loginOrEmail: data.rs_email,
        rs_password: data.rs_password,
      });

      const DATA = jSession.data;
      const accessToken = DATA.rs_accessToken;
      const refreshToken = DATA.rs_refreshToken;
      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);

      alert(
        '' +
          json.message +
          '\nПодтвердите аккаунт перейдя по ссылке на электронной почте',
      );
      route.replace('/account');
    } catch (exception) {
      try {
        dispatch({ type: SignInTypes.SIGN_IN_ERROR, payload: `${exception}` });
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
      } catch (exception) {
        console.log(exception);
        alert(exception);
        return;
      }

      alert(exception);
    }
  }

  return (
    <AppHead title="Регистрация" description="Регистрация">
      <AppWrapper>
        <div className={styles.form_margins}>
          <div className={styles.form}>
            <h1>Регистрация</h1>
            <div>
              <label className={styles.form__label} htmlFor="id">
                ФИО наставника
              </label>
              <div>
                {UserGetByIdData.isFetch ? (
                  <span style={{ color: 'lightgray' }}>
                    Поиск пользователя по id={data.rs_ref}
                  </span>
                ) : UserGetByIdData.isNotFound ? (
                  <span style={{ color: 'red' }}>
                    Пользователя нет в базе по id={ref}
                  </span>
                ) : UserGetByIdData.error ? (
                  <span style={{ color: 'red' }}>
                    {`${UserGetByIdData.error}`}
                  </span>
                ) : (
                  [
                    UserGetByIdData.data.rs_surname,
                    UserGetByIdData.data.rs_name,
                    UserGetByIdData.data.rs_middlename,
                  ]
                    .filter((e) => e.length > 0)
                    .join(' ')
                )}
              </div>
            </div>
            <br />
            <div>
              <label className={styles.form__label} htmlFor="surname">
                Фамилия
              </label>
              <input
                className={styles.form__input}
                id="surname"
                type="text"
                placeholder="Иванов"
                value={data.rs_surname}
                onChange={(event) =>
                  setData({ ...data, rs_surname: event.target.value })
                }
              />
            </div>
            <div>
              <label className={styles.form__label} htmlFor="name">
                Имя
              </label>
              <input
                className={styles.form__input}
                id="name"
                type="text"
                placeholder="Иван"
                value={data.rs_name}
                onChange={(event) =>
                  setData({ ...data, rs_name: event.target.value })
                }
              />
            </div>
            <div>
              <label className={styles.form__label} htmlFor="middlename">
                Отчество
              </label>
              <input
                className={styles.form__input}
                id="middlename"
                type="text"
                placeholder="Иванович"
                value={data.rs_middlename}
                onChange={(event) =>
                  setData({ ...data, rs_middlename: event.target.value })
                }
              />
            </div>
            <br />
            <div>
              <label className={styles.form__label} htmlFor="birthday">
                Дата рождения{' '}
                {data.rs_birthday.length > 0 ? (
                  <span style={{ color: 'gray' }}>({data.rs_birthday})</span>
                ) : null}
              </label>
              <DateInput data={data} setFunc={setData} />
            </div>
            <div>
              <label className={styles.form__label}>
                Телефон{' '}
                {data.rs_phone.length > 0 ? (
                  <span style={{ color: 'gray' }}>({data.rs_phone})</span>
                ) : null}
              </label>
              <PhoneInput value={data.rs_phone} setFunc={setData} data={data} />
            </div>
            <div>
              <label className={styles.form__label} htmlFor="telegram">
                Telegram nickname
              </label>
              <input
                className={styles.form__input}
                id="telegram"
                type="text"
                placeholder="Telegram ник"
                value={data.rs_telegramNickname}
                onChange={(event) =>
                  setData({ ...data, rs_telegramNickname: event.target.value })
                }
              />
            </div>
            <div>
              <label className={styles.form__label} htmlFor="address">
                Город
              </label>
              <input
                className={styles.form__input}
                id="address"
                type="text"
                placeholder="Минск"
                value={data.rs_address}
                onChange={(event) =>
                  setData({ ...data, rs_address: event.target.value })
                }
                style={{ marginBottom: 0 }}
              />
            </div>
            <select
              className={styles.form__select}
              onChange={(event) => {
                const value = event.target.value;
                if (value.startsWith('Найдено:')) return;
                setData((data) => ({
                  ...data,
                  rs_address: event.target.value,
                }));
              }}>
              <option>Найдено: {addresses.length}</option>
              {addresses.map((e, i) => {
                return <option key={`${i}-${e}`}>{e}</option>;
              })}
            </select>
            <br />
            <div>
              <label className={styles.form__label} htmlFor="email">
                Электронная почта
              </label>
              <input
                className={styles.form__input}
                id="email"
                type="email"
                placeholder="ivanov@site.local"
                value={data.rs_email}
                onChange={(event) =>
                  setData({ ...data, rs_email: event.target.value })
                }
              />
            </div>
            <div>
              <label className={styles.form__label} htmlFor="login">
                Логин
              </label>
              <input
                className={styles.form__input}
                id="login"
                type="string"
                placeholder="Ivanov"
                value={data.rs_login}
                onChange={(event) =>
                  setData({ ...data, rs_login: event.target.value })
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
                placeholder="********"
                value={data.rs_password}
                onChange={(event) =>
                  setData({ ...data, rs_password: event.target.value })
                }
              />
            </div>
            <br />
            <button
              className={styles.form__button}
              onClick={createUser}
              disabled={SignInData.isFetch}>
              {SignInData.isFetch ? 'Данные отправляются...' : 'Регистрация'}
            </button>
            <Link className={styles.from__a} href="/sign-in">
              У меня есть аккаунт
            </Link>
            {SignInData.isNotVerify ? (
              <p style={{ color: 'lightgray' }}>...</p>
            ) : SignInData.isFetch ? (
              <p style={{ color: 'lightgray' }}>Отправка данных</p>
            ) : SignInData.error ? (
              <p style={{ color: 'red' }}>{SignInData.error}</p>
            ) : null}
          </div>
        </div>
      </AppWrapper>
    </AppHead>
  );
}
