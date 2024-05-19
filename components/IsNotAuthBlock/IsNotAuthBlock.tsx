import Link from 'next/link';
import AppWrapper from '../AppWrapper/AppWrapper';
import AppContainer from '../AppContainer/AppContainer';
import AppColorPostBlock from '../AppColorPostBlock/AppColorPostBlock';

export default function IsNotAuthBlock() {
  return (
    <AppWrapper>
      <AppContainer>
        <AppColorPostBlock>
          <h2>Вы не вошли в аккаунт</h2>

          <p style={{ textAlign: 'center' }}>
            <Link href="/sign-up">Регистрация</Link>
          </p>
          <p style={{ textAlign: 'center' }}>
            <Link href="/sign-in">Вход</Link>
          </p>
        </AppColorPostBlock>
      </AppContainer>
    </AppWrapper>
  );
}
