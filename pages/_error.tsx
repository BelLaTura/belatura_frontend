import AppHead from '@/components/AppHead/AppHead';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';

export default function PageError() {
  return (
    <AppHead title="Ошибка" description="Ошибка">
      <AppWrapper>
        <AppContainer>
          <h1>Ошибка</h1>
        </AppContainer>
      </AppWrapper>
    </AppHead>
  );
}
