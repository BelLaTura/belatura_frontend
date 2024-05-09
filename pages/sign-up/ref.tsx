import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AppWrapper from '@/components/AppWrapper/AppWrapper';

export default function SignUpNoRefPage() {
  const route = useRouter();

  useEffect(() => {
    route.replace('/sign-up/ref/80000001');
  }, []);

  return <AppWrapper />;
}
