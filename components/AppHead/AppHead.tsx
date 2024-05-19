import Head from 'next/head';
import { ReactNode } from 'react';
import OrgData from '@/public/data/organization-data.json';

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
          {props.title ? `${props.title} | ${OrgData.title}` : 'Страница'}
        </title>
        <meta name="description" content={props.description || '...'} />
      </Head>
      {props.children}
    </>
  );
}
