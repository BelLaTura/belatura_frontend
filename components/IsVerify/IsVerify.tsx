import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootStoreDto } from '@/store';
import AppWrapper from '../AppWrapper/AppWrapper';
import AppColorPostBlock from '../AppColorPostBlock/AppColorPostBlock';

interface IProps {
  children: ReactNode;
}

export default function IsVerify(props: IProps) {
  const VerifyData = useSelector((state: RootStoreDto) => state.VerifyReducer);

  if (VerifyData.error) {
    return (
      <AppWrapper>
        <AppColorPostBlock>
          <p>{VerifyData.error}</p>
        </AppColorPostBlock>
      </AppWrapper>
    );
  }

  if (VerifyData.isLoading) {
    return (
      <AppWrapper>
        <AppColorPostBlock>
          <p>Проверка авторизации</p>
        </AppColorPostBlock>
      </AppWrapper>
    );
  }

  return props.children;
}
