import { ReactNode } from 'react';
import {
  IconDefinition,
  faTree,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import AppNav from '../AppNav/AppNav';
import IsVerify from '../IsVerify/IsVerify';
import styles from './AppWrapper.module.css';
import AppFooter from '../AppFooter/AppFooter';

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
    <IsVerify>
      <div className={styles.image_block}>
        <div className={styles.wrapper}>
          <div className={styles.wrapper__content}>
            <AppNav />
            {props.children}
          </div>
          {/* <div className={styles.wrapper__footer}> */}
          <AppFooter />
          {/* </div> */}
        </div>
        {/* <div className={styles.wrapper__footer}>
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
      </div> */}
      </div>
    </IsVerify>
  );
}
