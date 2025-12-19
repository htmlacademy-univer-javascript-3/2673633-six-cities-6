import { Review } from '@/types/review.ts';
import ReviewItem from '@/components/review-item/review-item.tsx';

type ReviewsListProps = {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ul className="reviews__list">
      {sortedReviews.slice(0, 10).map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

