import { ReactNode } from 'react';
import styles from './AppColorBlock.module.css';

interface IProps {
  children: ReactNode;
}

export default function AppColorBlock(props: IProps) {
  return <div className={styles.color_block}>{props.children}</div>;
}
