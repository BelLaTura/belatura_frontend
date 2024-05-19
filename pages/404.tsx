import AppHead from '@/components/AppHead/AppHead';
import AppColorPostBlock from '@/components/AppColorPostBlock/AppColorPostBlock';

export default function Page404() {
  return (
    <AppHead title="Ошибка 404" description="Ошибка 404">
      <AppColorPostBlock>
        <h1>Ошибка 404</h1>
        <h2>
          Страница не найдена. Либо она удалена. Либо она ещё создается...
        </h2>
      </AppColorPostBlock>
    </AppHead>
  );
}
