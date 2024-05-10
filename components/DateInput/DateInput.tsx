import { useEffect, useState } from 'react';
import styles from './DateInput.module.css';
import { BellaturaUserCreateBodyDto } from '@/types/belatura/api/users';

const months = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

interface IProps {
  setFunc: Function;
  data: BellaturaUserCreateBodyDto;
}

export default function DateInput(props: IProps) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const maxYear = currentYear - 16;
  const minYear = currentYear - 110;
  const years = getIntervalArray(minYear, maxYear);

  const [YYYY, setYYYY] = useState<number>(currentDate.getFullYear() - 18);
  const [MM, setMM] = useState<number>(12);
  const [DD, setDD] = useState<number>(31);
  const [days, setDays] = useState<number[]>(getIncrementArray(31));

  useEffect(() => {
    if (YYYY > maxYear) {
      setYYYY(maxYear);
      return;
    }

    if (YYYY < minYear) {
      setYYYY(minYear);
      return;
    }
  }, [YYYY]);

  function setDate(yyyy: number, mm: number, dd: number) {
    const maxDays = new Date(yyyy, mm, 0).getDate();
    const resultMM = mm > 12 ? 12 : mm < 1 ? 1 : mm;
    const resultDD = dd > maxDays ? maxDays : dd < 1 ? 1 : dd;
    setDays(getIncrementArray(maxDays));
    setYYYY(yyyy);
    setMM(resultMM);
    setDD(resultDD);

    const dYYYY = `${yyyy}`.padStart(4, '0');
    const dMM = `${resultMM}`.padStart(2, '0');
    const dYY = `${resultDD}`.padStart(2, '0');
    console.log(`${dYYYY}-${dMM}-${dYY}`);

    props.setFunc({ ...props.data, rs_birthday: `${dYYYY}-${dMM}-${dYY}` });
  }

  return (
    <div className={styles.wrapper}>
      <select
        onChange={(event) => setDate(YYYY, MM, Number(event.target.value))}
        className={styles.select_DD}
        value={DD}>
        {days.map((element) => {
          const numberDay = element;
          return (
            <option key={numberDay} value={numberDay}>
              {numberDay}
            </option>
          );
        })}
      </select>
      <select
        onChange={(event) => setDate(YYYY, Number(event.target.value), DD)}
        className={styles.select_MM}
        value={MM}>
        {months.map((element, index) => {
          const stringMonth = element;
          const numberMonth = index + 1;
          return (
            <option key={stringMonth} value={numberMonth}>
              {stringMonth}
            </option>
          );
        })}
      </select>
      <select
        onChange={(event) => setDate(Number(event.target.value), MM, DD)}
        className={styles.select_YYYY}
        value={YYYY}>
        {years.map((element) => {
          const numberYear = element;
          return (
            <option key={numberYear} value={numberYear}>
              {numberYear}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function getIncrementArray(lastNumber: number): number[] {
  return Array.from(Array(lastNumber).keys()).map((i) => i + 1);
}

function getIntervalArray(firstNumber: number, seccondNumber: number) {
  const arr: number[] = [];

  for (let i = firstNumber; i < seccondNumber; ++i) {
    arr.push(i);
  }

  return arr;
}
