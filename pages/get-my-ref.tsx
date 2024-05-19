import { AxiosError } from 'axios';
import { RootStoreDto } from '@/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  BellaturaUserGetMyDataBodyDto,
  emptyBellaturaUserGetMyDataBodyDto,
} from '@/types/belatura/api/users';
import AppEnv from '@/utils/app-env';
import AppHead from '@/components/AppHead/AppHead';
import styles from '@/styles/SignUpPage.module.css';
import { VerifyTypes } from '@/types/redux/is-verify';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';
import { BellaturaUserGetMyData } from '@/utils/fetch/belatura/users';
import IsNotAuthBlock from '@/components/IsNotAuthBlock/IsNotAuthBlock';
import { BellaturaSessionIsVerify } from '@/utils/fetch/belatura/sessions';
import AppColorPostBlock from '@/components/AppColorPostBlock/AppColorPostBlock';

const SEO_TITLE = 'Моя реферальная ссалка';
const SEO_DESCRIPTION = 'Моя реферальная ссалка';

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
              <h3>Моя реферальная ссылка</h3>
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
