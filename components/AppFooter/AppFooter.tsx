import AppA from '../AppA/AppA';
import styles from './AppFooter.module.css';
import UnpData from '@/public/data/unp-data.json';
import AppContainer from '../AppContainer/AppContainer';
import AppColorBlock from '../AppColorBlock/AppColorBlock';
import OrgData from '@/public/data/organization-data.json';

export default function AppFooter() {
  return (
    <AppColorBlock>
      <footer className={styles.footer}>
        <AppContainer>
          <div className={styles.footer__block}>
            <div className={styles.footer__all_info}>
              <div className={styles.footer__info_b}>
                <p>{UnpData._fullname}</p>
                <p>
                  Свидетельство о государственной регистрации индивидульного
                  предпринимателя №{UnpData._doc_number} выдано{' '}
                  {UnpData._create_data_formated} {UnpData._specialist}
                </p>
                <p>{UnpData._full_address}</p>
                <p>
                  В торговом реестре с XX XXXX XXXX г., № регистрации XXXXXX
                </p>
              </div>
              <div className={styles.footer__info_creator}>
                <p>Режим работы {OrgData['work-time']}</p>
                <p>Контакты владельца:</p>
                {OrgData.lst_contacts.map((e) => {
                  if (e.type === 'phone') {
                    const phone = e.value;
                    const phoneNoMinus = phone.replace('-', '');
                    return (
                      <AppA key={e.value} href={`tel:${phoneNoMinus}`}>
                        {phone}
                      </AppA>
                    );
                  }

                  if (e.type === 'email') {
                    const email = e.value;
                    return (
                      <AppA key={e.value} href={`mailto:${email}`}>
                        {email}
                      </AppA>
                    );
                  }
                })}
              </div>
            </div>
            <img src="/images/pay.png" alt="" className={styles.pay_image} />
          </div>
        </AppContainer>
      </footer>
    </AppColorBlock>
  );
}
