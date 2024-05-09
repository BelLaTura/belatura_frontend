import AppEnv from '@/utils/app-env';
import Head from 'next/head';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function AppHead(props: IProps) {
  return (
    <>
      <Head>
        <title>
          {props.title ? `${props.title} | ${AppEnv.TITLE}` : 'Страница'}
        </title>
        <meta name="description" content={props.description || '...'} />
      </Head>
      {props.children}
    </>
  );
}
