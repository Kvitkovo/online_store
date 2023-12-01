import React, { useState } from 'react';
import Modals from '../../Modals/Modals';
import styles from './RegisterModal.module.scss';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';
import RegisterLetter from '../ConfirmationModals/RegisterLetter';
import PasswordChecklist from 'react-password-checklist';
/* eslint-disable max-len */
import { registerUser } from '../../../../services/registration/registration.service';

const RegisterModal = ({ toggleRegister, toggleLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPasswordReq, setShowPasswordReq] = useState(true);

  const handleEmailBlur = () => {
    setSubmitted(true);
    if (!email) {
      setEmailError('Введіть електронну пошту');
    } else if (!validateEmail(email)) {
      setEmailError('Невірний формат електронної пошти');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    setSubmitted(true);
    if (!password) {
      setPasswordError('Введіть пароль');
    } else if (!validatePassword(password)) {
      setPasswordError('Невірний формат паролю');
    } else {
      setPasswordError('');
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const disallowedPattern = /\.ru$/i;
    return emailPattern.test(value) && !disallowedPattern.test(value);
  };

  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\s]).{8,}$/;
    return passwordPattern.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateEmail(email) && validatePassword(password) && name) {
      const response = await registerUser({
        firstName: name,
        email: email,
        password: password,
      });

      if (response === true) {
        setRegistrationSuccess(true);
      } else if (response && response.error) {
        setEmailError(response.error);
      }
    }
  };
  return (
    <>
      {registrationSuccess ? (
        <RegisterLetter userEmail={email} toggleModal={toggleRegister} />
      ) : (
        <Modals type="login" onClick={toggleRegister}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <p className={styles.loginBtn} onClick={toggleLogin}>
                Вхід
              </p>
              <p className={styles.registerBtn}>Реєстрація</p>
            </div>
            <div className={styles.closeBtn}>
              <IconButton
                icon={<ICONS.closeMobile />}
                onClick={toggleRegister}
              />
            </div>
          </div>

          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <div className={styles.dataContainer}>
                <div className={styles.nameContainer}>
                  <label className={styles.labelData} htmlFor="name">
                    Ім’я {submitted && !name && <span>*</span>}
                  </label>

                  <input
                    id="name"
                    className={styles.dataInput}
                    type="text"
                    placeholder="Введіть ваше ім’я"
                    onChange={(e) => setName(e.target.value.trim())}
                  />
                  {submitted && !name && (
                    <p className={styles.errorMessage}>Введіть ваше ім`я</p>
                  )}
                </div>
                <div className={styles.emailContainer}>
                  <label className={styles.labelData} htmlFor="email">
                    Ел. пошта {submitted && !email && <span>*</span>}
                  </label>

                  <input
                    id="email"
                    className={styles.dataInput}
                    type="email"
                    placeholder="Введіть електронну пошту"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.trim());
                      setEmailError('');
                    }}
                    onBlur={handleEmailBlur}
                  />
                  {submitted && emailError && (
                    <p className={styles.errorMessage}>{emailError}</p>
                  )}
                </div>

                <div className={styles.paswordContainer}>
                  <label className={styles.labelData} htmlFor="password">
                    Пароль {submitted && !password && <span>*</span>}
                  </label>

                  <input
                    id="password"
                    name="password"
                    className={styles.dataInput}
                    type="password"
                    placeholder="Введіть ваш пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handlePasswordBlur}
                  />

                  {submitted && passwordError && (
                    <PasswordChecklist
                      className={styles.errorMessage}
                      rules={[
                        'minLength',
                        'number',
                        'capital',
                        'lowercase',
                        'letter',
                      ]}
                      minLength={8}
                      value={password}
                      messages={{
                        letter: 'Латинські літери.',
                        minLength: 'Не менше 8 символів.',
                        number: 'Мінімум одна цифра',
                        capital: 'Мінімум одна велика літера.',
                        lowercase: 'Мінімум одна маленька літера.',
                      }}
                      onValid={() => setShowPasswordReq(false)}
                      onInvalid={() => setShowPasswordReq(true)}
                    />
                  )}
                  {showPasswordReq && !submitted && (
                    <p className={styles.passwordReq}>
                      Пароль має бути не менше 8 символів, складатись з цифр,
                      маленьких та великих латинських літер.
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.button}>
                <Button
                  variant="primary"
                  label="Зареєструватися"
                  padding="padding-sm"
                  isFullWidth={true}
                  type="submit"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </Modals>
      )}
    </>
  );
};
export default RegisterModal;
