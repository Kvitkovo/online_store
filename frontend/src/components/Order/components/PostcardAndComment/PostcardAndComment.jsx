import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './PostcardAndComment.module.scss';
import Button from '../../../ui-kit/components/Button';

const PostcardAndComment = ({ postcardData }) => {
  const [showPostcardText, setShowPostcardText] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const { register } = useForm({
    defaultValues: {
      postcard: postcardData?.postcard ? postcardData.postCard : 'Add postcard',
    },
  });
  return (
    <form className={styles.postcardForm}>
      <label htmlFor="postcard" className={styles.radioBtn}>
        <input
          type="radio"
          id="postcard"
          value="Add postcard"
          {...register('postcard')}
          onChange={() => {
            setShowPostcardText(true);
          }}
        />
        Додати листівку з побажанням
      </label>
      {showPostcardText && (
        <textarea
          placeholder="Напишіть ваше побажання"
          {...register('postcardText')}
        ></textarea>
      )}
      <label htmlFor="noPostcard" className={styles.radioBtn}>
        <input
          type="radio"
          id="noPostcard"
          value="No postcard"
          {...register('postcard')}
          onChange={() => {
            setShowPostcardText(false);
          }}
        />
        Без листівки
      </label>
      <div className={styles.comment}>
        <label htmlFor="comment" onClick={() => setShowComment(true)}>
          Коментар до замовлення
        </label>
        {showComment && (
          <textarea
            id="comment"
            placeholder="Напишіть ваш коментар"
            {...register('comment')}
          />
        )}
      </div>
      <div className={styles.continueButton}>
        <Button
          label="Продовжити"
          variant="primary"
          padding="padding-even"
          type="submit"
        />
      </div>
    </form>
  );
};
export default PostcardAndComment;
