import { ReactNode } from 'react';
import styles from './AppColorPostBlock.module.css';

interface IProps {
  children: ReactNode;
}

export default function AppColorPostBlock(props: IProps) {
  return <div className={styles.post_block}>{props.children}</div>;
}
