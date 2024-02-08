import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './PostcardAndComment.module.scss';

const PostcardAndComment = ({ postcardData }) => {
  const [showPostcardTextarea, setShowPostcardTextarea] = useState(true);
  const { register } = useForm({
    defaultValues: {
      postcard: postcardData?.postcard ? postcardData.postCard : 'Add postcard',
    },
  });
  return (
    <form>
      <label htmlFor="postcard" className={styles.radioBtn}>
        <input
          type="radio"
          id="postcard"
          value="Add postcard"
          {...register('postcard')}
          onChange={() => {
            setShowPostcardTextarea(true);
          }}
        />
        Додати листівку з побажанням
      </label>
      {showPostcardTextarea && (
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
            setShowPostcardTextarea(false);
          }}
        />
        Без листівки
      </label>
    </form>
  );
};
export default PostcardAndComment;
