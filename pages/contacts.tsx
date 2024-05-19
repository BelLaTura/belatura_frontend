import {
  faTelegram,
  faViber,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppA from '@/components/AppA/AppA';
import AppHead from '@/components/AppHead/AppHead';
import styles from '@/styles/ContactsPage.module.css';
import contacts from './../public/data/contacts.json';
import YandexMap from '@/components/YandexMap/YandexMap';
// import GoogleMap from '@/components/GoogleMap/GoogleMap';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppContainer from '@/components/AppContainer/AppContainer';
import AppColorPostBlock from '@/components/AppColorPostBlock/AppColorPostBlock';

const SEO_TITLE = 'Контакты';
const SEO_DESCRIPTION = 'Контакты';

export default function ContactsPage() {
  return (
    <AppHead title={SEO_TITLE} description={SEO_DESCRIPTION}>
      <AppWrapper>
        <AppContainer>
          <AppColorPostBlock>
            <div
              style={{
                backgroundColor: 'rgba(255,255,255, 0.7)',
                padding: '8px',
                borderRadius: '8px',
              }}>
              <h1>Контакты</h1>
              {contacts.map((e) => {
                return (
                  <div key={e.title}>
                    <h2>{e.title}</h2>
                    {e.text.split('\n').map((t) => {
                      return (
                        <p key={t} style={{ textAlign: 'center' }}>
                          {t}
                        </p>
                      );
                    })}
                    <div className={styles.contact__icons_block}>
                      {e.lst_contacts.map((c) => {
                        if (c.type === 'telegram') {
                          const telegramNickname = c.value
                            .replace('@', '')
                            .replace('https://t.me/', '');
                          return (
                            <a
                              key={c.value}
                              href={`https://t.me/${telegramNickname}`}
                              className={`${styles.contact__icon_a} ${styles['contact__icon_a--telegram']}`}>
                              <FontAwesomeIcon icon={faTelegram} />
                            </a>
                          );
                        }

                        if (c.type === 'viber') {
                          const viberPhone = c.value.replace('-', '');
                          return (
                            <a
                              key={c.value}
                              href={`viber://add?number=${viberPhone}`}
                              className={`${styles.contact__icon_a} ${styles['contact__icon_a--viber']}`}>
                              <FontAwesomeIcon icon={faViber} />
                            </a>
                          );
                        }

                        if (c.type === 'whatsapp') {
                          const whatsappPhone = c.value.replace('-', '');
                          return (
                            <a
                              key={c.value}
                              href={`https://api.whatsapp.com/send?phone=${whatsappPhone}`}
                              className={`${styles.contact__icon_a} ${styles['contact__icon_a--whatsapp']}`}>
                              <FontAwesomeIcon icon={faWhatsapp} />
                            </a>
                          );
                        }
                        return null;
                      })}
                    </div>
                    {e.lst_contacts.map((c) => {
                      if (c.type === 'phone') {
                        return (
                          <AppA key={c.value} href={`tel:${c.value}`}>
                            {c.value}
                          </AppA>
                        );
                      }

                      if (c.type === 'email') {
                        return (
                          <AppA key={c.value} href={`mailto:${c.value}`}>
                            {c.value}
                          </AppA>
                        );
                      }
                      return null;
                    })}
                    {e.lst_contacts.map((e) => {
                      if (e.type === 'yandex-map-src') {
                        return (
                          <div
                            key={e.value}
                            className={styles.contact__map_block}>
                            <YandexMap key={e.value} src={e.value} />
                          </div>
                        );
                      }

                      // if (e.type === 'google-map-pb') {
                      //   return (
                      //     <div className={styles.contact__map_block}>
                      //       <GoogleMap key={e.value} pb={e.value} />
                      //     </div>
                      //   );
                      // }

                      return null;
                    })}
                  </div>
                );
              })}
            </div>
          </AppColorPostBlock>
        </AppContainer>
      </AppWrapper>
    </AppHead>
  );
}
