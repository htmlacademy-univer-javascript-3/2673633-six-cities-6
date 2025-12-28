import { Review } from '@/types/review/review.ts';
import { useMemo, memo } from 'react';

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

const ReviewItem = memo(({ review }: { review: Review }) => {
  const formattedDate = useMemo(
    () => formatDate(review.date),
    [review.date],
  );

  const ratingWidth = useMemo(
    () => `${review.rating * 20}%`,
    [review.rating],
  );

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
});

ReviewItem.displayName = 'ReviewItem';

export default ReviewItem;
