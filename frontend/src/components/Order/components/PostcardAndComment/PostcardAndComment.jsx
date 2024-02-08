import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './PostcardAndComment.module.scss';

const PostcardAndComment = ({ postcardData }) => {
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
        />
        Додати листівку з побажанням
      </label>
      <label htmlFor="noPostcard" className={styles.radioBtn}>
        <input
          type="radio"
          id="noPostcard"
          value="No postcard"
          {...register('postcard')}
        />
        Без листівки
      </label>
    </form>
  );
};
export default PostcardAndComment;
