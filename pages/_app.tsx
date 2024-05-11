import { AppProps } from 'next/app';
import ReduxProvider from '@/components/ReduxProvider/ReduxProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />;
    </ReduxProvider>
  );
}
