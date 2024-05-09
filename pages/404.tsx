import AppHead from '@/components/AppHead/AppHead';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';

export default function Page404() {
  return (
    <AppHead title="Ошибка 404" description="Ошибка 404">
      <AppWrapper>
        <AppContainer>
          <h1>Ошибка 404</h1>
          <h2>
            Страница не найдена. Либо она удалена. Либо она ещё создается...
          </h2>
        </AppContainer>
      </AppWrapper>
    </AppHead>
  );
}
