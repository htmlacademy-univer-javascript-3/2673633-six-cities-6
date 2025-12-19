import { Offer } from '@/types/offer.ts';
import { Link, useNavigate } from 'react-router-dom';
import { memo, useCallback, useMemo } from 'react';
import { changeFavoriteStatus } from '@/store/api-actions.ts';
import { useAppDispatch } from '@/hooks/use-app-dispatch.ts';
import { useAppSelector } from '@/hooks/use-app-selector.ts';

type CardType = 'cities' | 'favorites' | 'near-places';

type CardProps = {
  offer: Offer;
  type: CardType;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const getDimensions = (type: CardType) => {
  switch (type) {
    case 'favorites':
      return { width: 150, height: 110 };
    case 'cities':
      return { width: 260, height: 200 };
    case 'near-places':
      return { width: 260, height: 200 };
    default:
      return { width: 260, height: 200 };
  }
};

const Card = memo(({ offer, type, onMouseEnter, onMouseLeave }: CardProps) => {
  const { width, height } = getDimensions(type);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const favorites = useAppSelector((state) => state.user.favoriteOffers);
  const isFavorite = favorites.some((item) => item.id === offer.id);
  const navigate = useNavigate();

  const handleClickOnFavorite = useCallback(() => {
    if (authorizationStatus === 'auth') {
      dispatch(changeFavoriteStatus({
        id: offer.id,
        status: isFavorite ? 0 : 1,
      }));
    } else {
      navigate('/login');
    }
  }, [navigate, authorizationStatus, dispatch, offer, isFavorite]);

  const bookmarkClassName = useMemo(
    () => `place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`,
    [isFavorite],
  );

  const ratingWidth = useMemo(
    () => `${offer.rating * 20}%`,
    [offer.rating],
  );

  const linkHref = useMemo(
    () => `/offer/${offer.id}`,
    [offer.id],
  );

  const cardClassName = useMemo(
    () => `${type}__card place-card`,
    [type],
  );

  const imageWrapperClassName = useMemo(
    () => `${type}__image-wrapper place-card__image-wrapper`,
    [type],
  );

  const cardInfoClassName = useMemo(
    () => `${type}__card-info place-card__info`,
    [type],
  );

  const bookmarkText = useMemo(
    () => isFavorite ? 'In bookmarks' : 'To bookmarks',
    [isFavorite],
  );

  return (
    <article
      className={cardClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClassName}>
        <Link to={linkHref}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cardInfoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>
          <button
            onClick={handleClickOnFavorite}
            className={bookmarkClassName}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {bookmarkText}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkHref}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
});

Card.displayName = 'Card';

export default Card;
