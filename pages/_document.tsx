import { Html, Head, Main, NextScript } from 'next/document';
import ReduxProvider from '@/components/ReduxProvider/ReduxProvider';

export default function Document() {
  return (
    <ReduxProvider>
      <Html lang="ru" style={{ width: '100%', height: '100%' }}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="apple-mobile-web-app-title" content="БелЛаТура" />
          <meta name="application-name" content="БелЛаТура" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <style>{`
        #__next {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        :root {
          --site-color: #081c90;
          --site-color-2: #dac10f;
          --site-color-2-rgba2: rgba(218, 193, 15, 0.8);
          --site-color-2-rgba: rgba(163, 45, 19, 0.8);
          --site-color-3: #00ab4f;
          --scrollbarBgColor: rgba(0, 102, 204, 0.4);
          --scrollbarThumbColor: #06c;
          --scrollbarThumbColorSecond: #06c;
          --scrollbarWidth: 1rem;
          --scrollbarBorder: 0 solid var(--scrollbarBgColor);
          --scrollbarBorderRadius: calc(var(--scrollbarWidth) / 10);
        }

        h1, h2, h3, h4, h5, h6 {
          color: var(--site-color);
          text-align: center;
        }

        a {
          text-decoration: none;
          color: var(--site-color);
        }
        `}</style>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={{ width: '100%', height: '100%', margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    </ReduxProvider>
  );
}
