import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import styles from './PhoneInput.module.css';
import countries from '@/public/data/countries.json';
import { BellaturaUserCreateBodyDto } from '@/types/belatura/api/users';

interface CountryJSON {
  name: string;
  dialCode: string;
  isoCode: string;
  flag: string;
}

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  setFunc: Function;
  data: BellaturaUserCreateBodyDto;
}

export default function PhoneInput(props: IProps) {
  const [isOpenedList, setIsOpenedList] = useState<boolean>(false);
  const [phoneObject, setPhoneObject] = useState<CountryJSON>({
    name: 'Belarus',
    dialCode: '+375',
    isoCode: 'BY',
    flag: 'https://cdn.kcak11.com/CountryFlags/countries/by.svg',
  });
  const [numberTail, setNumberTail] = useState<string>('');

  function selectCountry(obj: CountryJSON) {
    setPhoneObject(obj);
    CloseOpenList();
  }

  function CloseOpenList() {
    setIsOpenedList((isOpenedList) => !isOpenedList);
  }

  useEffect(() => {
    const phone: string = '' + phoneObject.dialCode + numberTail;
    const data = props.data;
    props.setFunc({ ...data, rs_phone: phone });
  }, [phoneObject.dialCode, numberTail]);

  return (
    <div className={styles.wrapper}>
      {/* <input type="text" value={props.value} /> */}
      <div className={styles.phone__b}>
        <button className={styles.phone__code} onClick={CloseOpenList}>
          <img
            className={styles.phone__code_img}
            src={phoneObject.flag}
            alt=""
          />
          {phoneObject.dialCode}
        </button>
        <input
          type="text"
          className={styles.form__input}
          maxLength={12}
          value={numberTail}
          onChange={(event) =>
            setNumberTail(event.target.value.replace(/\D/g, ''))
          }
        />
      </div>
      <ul
        className={`${styles.phone__ul} ${isOpenedList ? styles['phone__ul--open'] : styles['phone__ul--close']}`}>
        {countries.map((e) => {
          return (
            <li key={e.isoCode}>
              <PhoneButton phoneobject={e} onClick={() => selectCountry(e)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface IPhoneButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  phoneobject: CountryJSON;
}

function PhoneButton(props: IPhoneButtonProps) {
  return (
    <button className={styles.phone__country_button} {...props}>
      <div className={styles.phone__img_b}>
        <img
          className={styles.phone__img}
          src={props.phoneobject.flag}
          alt=""
        />
      </div>
      {props.phoneobject.isoCode} ({props.phoneobject.dialCode}){' '}
      {props.phoneobject.name}
    </button>
  );
}
