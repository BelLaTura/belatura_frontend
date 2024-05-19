import styles from './AppA.module.css';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function AppA(props: IProps) {
  return <a {...props} className={styles.a} />;
}
