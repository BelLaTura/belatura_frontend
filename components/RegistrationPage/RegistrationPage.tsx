import Link from 'next/link';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/SignUpPage.module.css';
import {
  BelaturaUserFindOneById,
  BelatureUserCreate,
} from '@/utils/fetch/belatura/users';
import {
  BelaturaUserCreateBodyDto,
  emptyBelaturaUserCreate,
} from '@/types/belatura/api/users';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import { NominatimOpenstreetmapOrgGetAddress } from '@/utils/fetch/nominatim.openstreetmap.org/getAddress';

const notFoundRefName = 'Нет такого наставника';

export default function SignUpRefPage() {
  const route = useRouter();
  const { ref } = route.query;
  const [addresses, setAddresses] = useState<string[]>([]);

  const [data, setData] = useState<BelaturaUserCreateBodyDto>(
    emptyBelaturaUserCreate,
  );

  const [refName, setRefName] = useState<string>(notFoundRefName);

  useEffect(() => {
    const number = Number(ref) || 1;
    setData({ ...data, rs_ref: number });
  }, [ref]);

  useEffect(() => {
    (async function () {
      const ref = data.rs_ref;
      try {
        const userData = await BelaturaUserFindOneById(ref);
        setRefName(userData.data.rs_initials_name);
      } catch (exception) {
        console.log(`${ref} => ${notFoundRefName}`);
        setRefName(notFoundRefName);
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
      const userData = await BelaturaUserFindOneById(data.rs_ref);
    } catch (exception) {
      alert('Вы не выбрали наставника');
      return true;
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
      if (await isNotOkCheck()) return;
      console.log(data);
      const json = await BelatureUserCreate(data);

      const DATA = json.data;
      const accessToken = DATA.rs_accessToken;
      const refreshToken = DATA.rs_refreshToken;
      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);

      alert(json.message);
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

      alert(exception);
    }
  }

  return (
    <AppWrapper>
      <div className={styles.form_margins}>
        <div className={styles.form}>
          <h1>Регистрация</h1>
          <div>
            <label className={styles.form__label} htmlFor="id">
              Мой наставник
            </label>
            <input
              className={styles.form__input}
              id="id"
              type="number"
              placeholder="100"
              value={data.rs_ref}
              onChange={(event) =>
                setData({ ...data, rs_ref: Number(event.target.value) || 0 })
              }
            />
            <div style={{ color: 'grey' }}>
              {refName} под id = {data.rs_ref}
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
              Дата рождения
            </label>
            <input
              className={styles.form__input}
              id="birthday"
              type="date"
              value={data.rs_birthday}
              onChange={(event) =>
                setData({ ...data, rs_birthday: event.target.value })
              }
            />
          </div>
          <div>
            <label className={styles.form__label} htmlFor="phone">
              Телефон
            </label>
            <input
              className={styles.form__input}
              id="phone"
              type="text"
              placeholder="+XXXXXXXXXXXX"
              value={data.rs_phone}
              onChange={(event) =>
                setData({ ...data, rs_phone: event.target.value })
              }
            />
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
            />
          </div>
          <select name="" id="" className={styles.form__select}>
            {addresses.length &&
              addresses.map((e) => {
                return (
                  <option
                    key={e}
                    onClick={() =>
                      setData((data) => ({ ...data, rs_address: e }))
                    }>
                    {e}
                  </option>
                );
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
          <button className={styles.form__button} onClick={createUser}>
            Регистрация
          </button>
          <Link className={styles.from__a} href="/sign-in">
            У меня есть аккаунт
          </Link>
        </div>
      </div>
    </AppWrapper>
  );
}
