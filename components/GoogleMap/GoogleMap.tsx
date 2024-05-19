import styles from './GoogleMap.module.css';

interface IProps {
  pb: string;
}

export default function GoogleMap(props: IProps) {
  return (
    <div className={styles.map}>
      <iframe
        src={`https://www.google.com/maps/embed?pb=${props.pb}`}
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
      />
    </div>
  );
}
