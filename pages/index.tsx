import AppHead from '@/components/AppHead/AppHead';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';

export default function HomePage() {
  return (
    <AppHead title="Главная" description="Главная">
      <AppWrapper>
        <AppContainer>
          <h1>Добро, пожаловать!</h1>
        </AppContainer>
      </AppWrapper>
    </AppHead>
  );
}
