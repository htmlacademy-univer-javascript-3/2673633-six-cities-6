import React, { useState, useCallback, useMemo, memo } from 'react';
import { sendReview } from '@/store/api-actions.ts';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/use-app-dispatch/use-app-dispatch.ts';
import { useAppSelector } from '@/hooks/use-app-selector/use-app-selector.ts';
import { RATINGS, REVIEW_MIN_LENGTH } from '@/constants/forms/forms.ts';
import { AUTH_STATUS } from '@/constants/auth-status/auth-status.ts';

const RatingOption = memo(({ value, id: reviewId, title, checked, onChange }: {
  value: string;
  id: string;
  title: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <React.Fragment key={reviewId}>
    <input
      className="form__rating-input visually-hidden"
      name="rating"
      value={value}
      id={reviewId}
      type="radio"
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={reviewId} className="reviews__rating-label form__rating-label" title={title}>
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </React.Fragment>
));

RatingOption.displayName = 'RatingOption';

export default function ReviewForm() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  const [formState, setFormState] = useState({
    rating: '-1',
    review: '',
  });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
      (async () => {
        try {
          await dispatch(sendReview({ id, comment: formState.review, rating: formState.rating }))
            .unwrap().then(() => setFormState({ rating: '-1', review: '' }));
        } catch (error) {
          /* empty */
        }
      })();
    }
  }, [id, dispatch, formState.review, formState.rating]);

  const isFormValid = useMemo(
    () => formState.rating !== '-1' && formState.review.length >= REVIEW_MIN_LENGTH,
    [formState.rating, formState.review]
  );

  const ratingOptions = useMemo(
    () => RATINGS.map(({ value, id: reviewId, title }) => (
      <RatingOption
        key={reviewId}
        value={value}
        id={reviewId}
        title={title}
        checked={formState.rating === value}
        onChange={handleChange}
      />
    )),
    [formState.rating, handleChange]
  );

  if (authorizationStatus !== AUTH_STATUS.Auth) {
    return null;
  }

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingOptions}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
        value={formState.review}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
