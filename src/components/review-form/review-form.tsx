import React, { useState } from 'react';
import { sendReview } from '@/store/api-actions.ts';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/use-app-dispatch.ts';
import { useAppSelector } from '@/hooks/use-app-selector.ts';

const REVIEW_MIN_LENGTH = 50;

export default function ReviewForm() {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const [formState, setFormState] = useState({
    rating: '-1',
    review: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
  };

  const isFormValid = formState.rating !== '-1' && formState.review.length >= REVIEW_MIN_LENGTH;

  const ratings = [
    { value: '5', id: '5-stars', title: 'perfect' },
    { value: '4', id: '4-stars', title: 'good' },
    { value: '3', id: '3-stars', title: 'not bad' },
    { value: '2', id: '2-stars', title: 'badly' },
    { value: '1', id: '1-star', title: 'terribly' },
  ];

  if (authorizationStatus !== 'auth') {
    return null;
  }

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(({ value, id: reviewId, title }) => (
          <React.Fragment key={reviewId}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={reviewId}
              type="radio"
              checked={formState.rating === value}
              onChange={handleChange}
            />
            <label htmlFor={reviewId} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
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
