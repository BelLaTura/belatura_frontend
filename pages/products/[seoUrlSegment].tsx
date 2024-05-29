import AppColorPostBlock from '@/components/AppColorPostBlock/AppColorPostBlock';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import {
  FetchItemBySeoUrlSegment,
  ItemDto,
  emptyItemDto,
} from '@/utils/fetch/bellatura.github.io/fetchItems';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import styles from '@/styles/ProductPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import AppHead from '@/components/AppHead/AppHead';

export default function ProductSeoUrlSegmentPage() {
  const route = useRouter();
  const { seoUrlSegment } = route.query;
  const [item, setItem] = useState<ItemDto>(emptyItemDto);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    (async function () {
      if (!seoUrlSegment) return;

      try {
        setIsLoading(true);
        const jItem = await FetchItemBySeoUrlSegment(`${seoUrlSegment}`);
        setIsLoading(false);

        const jPhotos = jItem.rs_photos.split('\n').filter((e) => e.length > 0);
        setPhotos(jPhotos);
        setSelectedImage(jPhotos[0] || '');
        setItem(jItem);
      } catch (exception) {
        setIsLoading(false);
        setError(`${exception}`);
      }
    })();
  }, [seoUrlSegment]);

  function leftPhoto() {
    let index = 0;
    for (let i = 0; i < photos.length; ++i) {
      if (photos[i] === selectedImage) {
        index = i;
        break;
      }
    }

    if (index - 1 < 0) {
      setSelectedImage(photos[photos.length - 1]);
    } else {
      setSelectedImage(photos[index - 1]);
    }
  }

  function rightPhoto() {
    let index = 0;
    for (let i = 0; i < photos.length; ++i) {
      if (photos[i] === selectedImage) {
        index = i;
        break;
      }
    }

    if (index + 1 >= photos.length) {
      setSelectedImage(photos[0]);
    } else {
      setSelectedImage(photos[index + 1]);
    }
  }

  if (error) {
    return (
      <AppWrapper>
        <AppContainer>
          <AppColorPostBlock>
            <div>{error}</div>
          </AppColorPostBlock>
        </AppContainer>
      </AppWrapper>
    );
  }

  if (isLoading) {
    return (
      <AppWrapper>
        <AppContainer>
          <AppColorPostBlock>
            <div>Загрузка данных...</div>
          </AppColorPostBlock>
        </AppContainer>
      </AppWrapper>
    );
  }

  return (
    <AppHead title={item.rs_seoTitle} description={item.rs_seoDescription}>
      <AppWrapper>
        <AppContainer>
          <AppColorPostBlock>
            <div>
              <div>
                <Link href="/">home</Link> /{' '}
                <Link href="/products">products</Link> /{' '}
                <Link href={`/products/${item.rs_seoUrlSegment}`}>
                  {item.rs_seoUrlSegment}
                </Link>
              </div>

              <h1>{item.rs_seoTitle}</h1>

              <div className={styles.image_carousel__wrapper}>
                <div className={styles.image_carousel__image_block}>
                  <img
                    src={selectedImage}
                    alt=""
                    className={styles.image_carousel__image}
                  />
                </div>
                <div className={styles.image_carousel__left}>
                  <button
                    className={styles.image_carousel__button}
                    onClick={leftPhoto}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>
                <div className={styles.image_carousel__right}>
                  <button
                    className={styles.image_carousel__button}
                    onClick={rightPhoto}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
                <div className={styles.image_carousel__image_circles_b}>
                  {photos.map((e) => {
                    if (e.localeCompare(selectedImage) === 0) {
                      return (
                        <span
                          key={e}
                          className={
                            styles.image_carousel__image_circle__selected
                          }></span>
                      );
                    }
                    return <span key={e}></span>;
                  })}
                </div>
              </div>

              <div className={styles.table__block}>
                <table className={styles.table}>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Артикул синонимы</td>
                      <td>{item.rs_vendors.split('\n').join('; ')}</td>
                    </tr>
                    <tr>
                      <td>Штрихкод</td>
                      <td>{item.rs_barcodes.split('\n').join(' | ')}</td>
                    </tr>
                    <tr>
                      <td>Код ТН ВЭД</td>
                      <td>{item.rs_codeTNVED}</td>
                    </tr>
                    <tr>
                      <td>Страна производитель</td>
                      <td>{item.rs_country}</td>
                    </tr>
                    <tr>
                      <td>Бренд</td>
                      <td>{item.rs_brand}</td>
                    </tr>
                    <tr>
                      <td>Место нахождение производителя</td>
                      <td>{item.rs_creatorAddress}</td>
                    </tr>
                    <tr>
                      <td>Место нахождение импортера</td>
                      <td>{item.rs_importAddress}</td>
                    </tr>
                    <tr>
                      <td>Место нахождение сервисной мастерской</td>
                      <td>{item.rs_serviceAddress || 'нет данных'}</td>
                    </tr>
                    <tr>
                      <td>Условия, сроки доставки</td>
                      <td>{item.rs_conclusion}</td>
                    </tr>
                    <tr>
                      <td>Наличие</td>
                      <td>{item.rs_count}</td>
                    </tr>
                    <tr>
                      <td>Дата изготовления</td>
                      <td>{item.rs_createDate}</td>
                    </tr>
                    <tr>
                      <td>Стоимость</td>
                      <td>Br {Number(item.rs_cost).toFixed(2)} (BYN)</td>
                    </tr>
                    <tr>
                      <td>Гарантийный срок</td>
                      <td>{item.rs_warranty}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.markdown_b}>
                <Markdown>{item.rs_markdown}</Markdown>
              </div>
            </div>
          </AppColorPostBlock>
        </AppContainer>
      </AppWrapper>
    </AppHead>
  );
}
