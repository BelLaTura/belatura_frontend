import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  BelaturaUserGetGenerations,
  BelaturaUserGetMyData,
} from '@/utils/fetch/belatura/users';
import styles from '@/styles/Tree.module.css';
import AppHead from '@/components/AppHead/AppHead';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';
import { BelaturaUserGetBodyDto } from '@/types/belatura/api/users';

export default function AccountPage() {
  const route = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [generations, setGenerations] = useState<number>(5);
  const [lst, setLst] = useState<BelaturaUserGetBodyDto[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access') || '';
    if (accessToken.length === 0) {
      setIsLogin(false);
      return;
    }
    setIsLogin(true);

    (async function () {
      try {
        const jData = await BelaturaUserGetMyData();
        const data = jData.data;
        const userId = data.rs_id;
        setUserId(userId);
        setIsLoaded(true);
      } catch (exception) {
        if (
          exception instanceof AxiosError &&
          exception.response &&
          exception.response.status === 401
        ) {
          route.replace('/sign-in');
        }
      }
    })();
  }, []);

  async function getGenerations() {
    try {
      if (generations <= 0) {
        setGenerations(1);
        return;
      }

      if (!isLoaded) {
        return;
      }

      const jData = await BelaturaUserGetGenerations(userId, generations);
      setLst(jData.data);
    } catch (exception) {
      alert(exception);
    }
  }

  useEffect(() => {
    getGenerations();
  }, [generations, isLoaded]);

  if (isLogin) {
    return (
      <AppHead title="Иерархия клиентов" description="Иерархия клиентов">
        <AppWrapper>
          <AppContainer>
            <h1>Иерархия клиентов</h1>
            <div className={styles.tree__input_b}>
              <label htmlFor="generations" className={styles.tree__label}>
                Количество поколений
              </label>
              <input
                id="generations"
                type="text"
                value={generations}
                onChange={(event) =>
                  setGenerations(Number(event.target.value.replace(/\D/g, '')))
                }
                className={styles.tree__input}
              />
            </div>
            <Tree userId={userId} lst={lst} />
          </AppContainer>
        </AppWrapper>
      </AppHead>
    );
  }

  return (
    <AppHead title="Иерархия клиентов" description="Иерархия клиентов">
      <AppWrapper>
        <AppContainer>
          <h1>Иерархия клиентов</h1>
          <h2>Вы не вошли в аккаунт</h2>
        </AppContainer>
      </AppWrapper>
    </AppHead>
  );
}

interface ITree {
  userId: number;
  lst: BelaturaUserGetBodyDto[];
}

function Tree(props: ITree) {
  const candidate = props.lst.find((e) => e.rs_id === props.userId);

  if (!candidate) return null;

  return (
    <div className={styles.tree__wrapper}>
      <ul className={styles.tree__ul}>
        <li className={styles.tree__li}>
          <div className={styles.tree__block}>
            <div>{candidate.rs_ref} - это мой наставник</div>
            <div>{candidate.rs_id} - это мой идентификатор</div>
            <div>({candidate.rs_initials_name}) - это мое имя</div>
          </div>
          <GetTreeNode userRef={props.userId} lst={props.lst} />
        </li>
      </ul>
    </div>
  );
}

interface IGEtTreeNode {
  userRef: number;
  lst: BelaturaUserGetBodyDto[];
}

function GetTreeNode(props: IGEtTreeNode) {
  return (
    <ul className={styles.tree__ul}>
      {props.lst
        .filter((e) => e.rs_ref === props.userRef)
        .map((e) => {
          return (
            <li key={e.rs_id} className={styles.tree__li}>
              <div className={styles.tree__block}>
                <div>{e.rs_ref} - Наставник</div>
                <div>{e.rs_id} - идентификатор клиента</div>
                <div>({e.rs_initials_name}) - имя клиента</div>
              </div>
              <GetTreeNode userRef={e.rs_id} lst={props.lst} />
            </li>
          );
        })}
    </ul>
  );
}
