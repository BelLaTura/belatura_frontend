import Link from 'next/link';
import { useEffect, useState } from 'react';
import AppHead from '@/components/AppHead/AppHead';
import styles from '@/styles/ProductsPage.module.css';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppColorPostBlock from '@/components/AppColorPostBlock/AppColorPostBlock';
import {
  FetchItems,
  ItemDto,
} from '@/utils/fetch/bellatura.github.io/fetchItems';

const SEO_TITLE = 'Продукты';
const SEO_DESCRIPTION = 'Продукты';

export default function AccountPage() {
  const [items, setItems] = useState<ItemDto[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const jItems = await FetchItems();
        setItems(jItems);
      } catch (exception) {
        alert(exception);
        return;
      }
    })();
  }, []);

  return (
    <AppHead title={SEO_TITLE} description={SEO_DESCRIPTION}>
      <AppWrapper>
        <AppContainer>
          <AppColorPostBlock>
            <h1>{SEO_TITLE}</h1>
            <ul className={styles.products__ul}>
              {items.map((e) => {
                const photos = e.rs_photos
                  .split('\n')
                  .filter((e) => e.length > 0);
                const mainPhoto = photos[0] || '';
                return (
                  <li key={e.rs_vendors} className={styles.products__li}>
                    <Link
                      href={`/products/${e.rs_seoUrlSegment}`}
                      className={styles.products__a}>
                      <div className={styles.products__image_b}>
                        <img
                          src={mainPhoto}
                          alt=""
                          className={styles.products__image}
                        />
                      </div>
                      <div className={styles.products__image_circles}>
                        {photos.map((e) => {
                          return <span key={e}></span>;
                        })}
                      </div>
                      <div className={styles.producs__title}>
                        {e.rs_seoTitle}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </AppColorPostBlock>
        </AppContainer>
      </AppWrapper>
    </AppHead>
  );
}
