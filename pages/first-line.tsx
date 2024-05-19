import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  BellaturaUserGetGenerations,
  BellaturaUserGetMyData,
} from '@/utils/fetch/belatura/users';
import { RootStoreDto } from '@/store';
import styles from '@/styles/Tree.module.css';
import AppHead from '@/components/AppHead/AppHead';
import { VerifyTypes } from '@/types/redux/is-verify';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import { BellaturaUserGetDto } from '@/types/belatura/api/users';
import AppContainer from '@/components/AppContainer/AppContainer';
import IsNotAuthBlock from '@/components/IsNotAuthBlock/IsNotAuthBlock';
import { BellaturaSessionIsVerify } from '@/utils/fetch/belatura/sessions';
import AppColorPostBlock from '@/components/AppColorPostBlock/AppColorPostBlock';

const SEO_TITLE = 'Моя первая линия';
const SEO_DESCRIPTION = 'Моя первая линия';

export default function FirstLinePage() {
  const route = useRouter();
  const dispatch = useDispatch();
  const VerifyData = useSelector((state: RootStoreDto) => state.VerifyReducer);

  const [lst, setLst] = useState<BellaturaUserGetDto[]>([]);
  const [userId, setUserId] = useState<number>(0);
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
        const jData = await BellaturaUserGetMyData();
        setIsLoading(false);
        const data = jData.data;
        const userId = data.rs_id;
        setUserId(userId);

        try {
          setIsLoading(true);
          const jTreeData = await BellaturaUserGetGenerations(userId, 1);
          setLst(jTreeData.data);
          setIsLoading(false);
        } catch (exception) {
          alert(exception);
        }
      } catch (exception) {
        alert(exception);
      }
    })();
  }, []);

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
    return (
      <AppHead title={SEO_TITLE} description={SEO_DESCRIPTION}>
        <AppWrapper>
          <AppContainer>
            <AppColorPostBlock>
              <h1>{SEO_TITLE}</h1>
              <div className={styles.first_line__table_wrapper}>
                <table className={styles.first_line__table}>
                  <thead>
                    <tr>
                      <td style={{ textAlign: 'center' }}>№</td>
                      <td style={{ textAlign: 'center' }}>ID</td>
                      <td style={{ textAlign: 'center' }}>Фамилия</td>
                      <td style={{ textAlign: 'center' }}>Имя</td>
                      <td style={{ textAlign: 'center' }}>Отчество</td>
                      <td style={{ textAlign: 'center' }}>Телефон</td>
                      <td style={{ textAlign: 'center' }}>Telegram</td>
                      <td style={{ textAlign: 'center' }}>Email</td>
                    </tr>
                  </thead>
                  <tbody>
                    {lst.length === 1 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: 'center' }}>
                          У вас нет клиентов
                        </td>
                      </tr>
                    ) : (
                      lst
                        .filter((e) => e.rs_ref === userId)
                        .map((e, i) => {
                          const telegramNickname = e.rs_telegramNickname
                            .replace('@', '')
                            .replace('https://t.me/', '');
                          const telegramLink = `https://t.me/${telegramNickname}`;

                          return (
                            <tr key={e.rs_id}>
                              <td style={{ textAlign: 'right' }}>{i + 1}</td>
                              <td>{e.rs_id}</td>
                              <td>{e.rs_surname}</td>
                              <td>{e.rs_name}</td>
                              <td>{e.rs_middlename}</td>
                              <td>
                                <a href={`tel:${e.rs_phone}`}>{e.rs_phone}</a>
                              </td>
                              <td>
                                {telegramNickname.length === 0 ? (
                                  'не указан'
                                ) : (
                                  <a href={telegramLink}>{telegramNickname}</a>
                                )}
                              </td>
                              <td>
                                <a href={`mailto:${e.rs_email}`}>
                                  {e.rs_email}
                                </a>
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>
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
