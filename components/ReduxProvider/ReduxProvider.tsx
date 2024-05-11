import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';

interface IProps {
  children: ReactNode;
}

export default function ReduxProvider(props: IProps) {
  return <Provider store={store}>{props.children}</Provider>;
}
