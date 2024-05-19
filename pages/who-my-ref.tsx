import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from '@/styles/SignUpPage.module.css';
import {
  BellaturaUserGetDto,
  emptyBellaturaUserGetMyDataBodyDto,
} from '@/types/belatura/api/users';
import {
  BellaturaUserFindOneById,
  BellaturaUserGetMyData,
} from '@/utils/fetch/belatura/users';
import { RootStoreDto } from '@/store';
import AppHead from '@/components/AppHead/AppHead';
import { VerifyTypes } from '@/types/redux/is-verify';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';
import IsNotAuthBlock from '@/components/IsNotAuthBlock/IsNotAuthBlock';
import { BellaturaSessionIsVerify } from '@/utils/fetch/belatura/sessions';
import AppColorPostBlock from '@/components/AppColorPostBlock/AppColorPostBlock';

const SEO_TITLE = 'Кто мой наставник';
const SEO_DESCRIPTION = 'Кто мой наставник';

export default function WhoMyRefPage() {
  const dispatch = useDispatch();
  const VerifyData = useSelector((state: RootStoreDto) => state.VerifyReducer);

  const [refData, setRefData] = useState<BellaturaUserGetDto>(
    emptyBellaturaUserGetMyDataBodyDto,
  );
  const [isSuperViser, setIsSuperViser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        await BellaturaSessionIsVerify();
        dispatch({ type: VerifyTypes.IS_VERIFY_TRUE });
        setIsLoading(false);
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
        const jUserData = await BellaturaUserGetMyData();
        setIsLoading(false);

        if (jUserData.data.rs_ref === 0) {
          setIsSuperViser(true);
          return;
        }

        try {
          setIsLoading(true);
          const jRefData = await BellaturaUserFindOneById(
            jUserData.data.rs_ref,
          );
          setIsLoading(false);
          setRefData(jRefData.data);
        } catch (exception) {
          setIsLoading(false);
          alert(exception);
          return;
        }
      } catch (exception) {
        setIsLoading(false);
        alert(exception);
        return;
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
              <h1>{SEO_TITLE} </h1>
              {isSuperViser ? (
                <p>У вас нет наставника</p>
              ) : (
                <div className={styles.app__table_wrapper}>
                  <table className={styles.app__table}>
                    <tbody>
                      <tr>
                        <td>ID</td>
                        <td>{refData.rs_id}</td>
                      </tr>
                      <tr>
                        <td>Фамилия</td>
                        <td>{refData.rs_surname}</td>
                      </tr>
                      <tr>
                        <td>Имя</td>
                        <td>{refData.rs_name}</td>
                      </tr>
                      <tr>
                        <td>Отчество</td>
                        <td>{refData.rs_middlename}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
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
