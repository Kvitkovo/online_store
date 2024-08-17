import React from 'react';
import Path from '../CardPage/components/Path';
import { useScroll } from '../../hooks/useScroll';
import styles from './Partner.module.scss';
import AdvantagesAnimation from './AdvantagesAnimation';

const Partner = () => {
  useScroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
    scrollOnMount: true,
  });
  return (
    <>
      <Path
        currentPageData={{ name: 'Стати партнером' }}
        currentPageType={'section'}
      />
      <section className={styles.main}>
        <h1 className={styles.title}>
          Станьте Нашим Партнером! <br /> Долучайтеся до Команди Kvitkovo!
        </h1>
        <p className={styles.description}>
          Ви працюєте у сфері квіткового бізнесу чи надаєте послуги доставки
          квітів? Ми раді вітати нових партнерів у команді Квітково! У нас
          розробляється інноваційна партнерська програма, яка відкриває нові
          можливості для співпраці та розвитку вашого бізнесу.
        </p>
      </section>
      <section className={styles.advantages}>
        <h2 className={styles.advantages__title}>
          Переваги Партнерства з Квітково:
        </h2>
        <AdvantagesAnimation />
      </section>
      <section className={styles.becomePartner}>
        <h2 className={styles.becomePartner__title}>Як Стати Партнером:</h2>
        <div className={styles.becomePartner__container}>
          <div className={styles.becomePartner__content}>
            <p>
              На даний момент робота над функціоналом для реєстрації партнерів у
              розробці. Але ви вже зараз можете залишити свої контактні дані у
              формі зворотнього {`зв'язку`}, вказавши, що вас цікавить
              партнерство. Наш менеджер
              {` зв'яжеться з вами найближчим часом для подальшої інформації.`}
            </p>
            <div className={styles.becomePartner__img}>
              <img src="/images/partners_1.jpg" alt=" Партнерство" />
            </div>
            <p>
              Зокрема, ми запрошуємо партнерів, які працюють у нашій галузі та
              надають послуги доставки з використанням автомобілів, які
              забезпечують необхідні температурні умови для збереження свіжості
              квітів.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.conclusions}>
        <h2 className={styles.conclusions__title}>
          Будьте в курсі інновацій та приєднуйтеся до{' '}
          <span className={styles.conclusions__title_accent}>Kvitkovo</span> –
          вашого найкращого партнера у світі квітів!
        </h2>
        <div className={styles.conclusions__imgContainer}>
          <img src="/images/partners_2.jpg" alt="Наша команда" />
          <img src="/images/partners_3.jpg" alt="Наша команда" />
        </div>
      </section>
    </>
  );
};

export default Partner;
