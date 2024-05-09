import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AppHead from '@/components/AppHead/AppHead';
import AppWrapper from '@/components/AppWrapper/AppWrapper';

export default function HomePage() {
  const route = useRouter();

  useEffect(() => {
    route.replace('/sign-up');
  }, []);

  return (
    <AppHead title="Главная" description="Главная">
      <AppWrapper />
    </AppHead>
  );
}
