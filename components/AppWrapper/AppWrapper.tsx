import { ReactNode } from 'react';
import styles from './AppWrapper.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faTree,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
  children?: ReactNode;
}

interface IMenu {
  title: string;
  href: string;
  icon: IconDefinition;
}

const menu: IMenu[] = [
  { title: 'Моя страница', href: '/account', icon: faUser },
  { title: 'Иерархия клиентов', href: '/tree', icon: faTree },
];

export default function AppWrapper(props: IProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__content}>{props.children}</div>
      <div className={styles.wrapper__footer}>
        <ul className={styles.wrapper__ul}>
          {menu.map((e) => {
            return (
              <li className={styles.wrapper__li} key={e.title}>
                <Link className={styles.wrapper__a} href={e.href}>
                  <div className={styles.wrapper__icon_b}>
                    <FontAwesomeIcon icon={e.icon} width={64} />
                  </div>
                  <div className={styles.wrapper__icon_text}>{e.title}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
