import styles from './YandexMap.module.css';

interface IProps {
  src: string;
}

export default function YandexMap(props: IProps) {
  return (
    <div className={styles.wrapper}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <iframe
          src={props.src}
          width="560"
          height="400"
          style={{ position: 'relative' }}></iframe>
      </div>
    </div>
  );
}
