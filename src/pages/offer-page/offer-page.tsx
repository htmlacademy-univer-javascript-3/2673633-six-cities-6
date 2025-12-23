import Header from '@/widgets/header/header.tsx';
import ReviewForm from '@/components/review-form/review-form.tsx';
import ReviewsList from '@/components/reviews-list/reviews-list.tsx';
import NearOffersList from '@/components/near-offers-list/near-offers-list.tsx';
import MapWrapper from '@/components/map-wrapper/map-wrapper.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch.ts';
import { changeFavoriteStatus, fetchNearOffers, fetchOffer, fetchReviews } from '@/store/api-actions.ts';
import { loadCurrentOffer, loadNearOffers, loadReviews } from '@/store/actions.ts';
import { useAppSelector } from '@/hooks/use-app-selector.ts';
import Spinner from '@/components/spinner/spinner.tsx';
import { PATHS } from '@/constants/constants.ts';

const ImageWrapper = memo(({ image }: { image: string }) => (
  <div className="offer__image-wrapper">
    <img className="offer__image" src={image} alt="Photo studio" />
  </div>
));

ImageWrapper.displayName = 'ImageWrapper';

const FeatureItem = memo(({ feature }: { feature: string }) => (
  <li className="offer__inside-item">{feature}</li>
));

FeatureItem.displayName = 'FeatureItem';

export default function OfferPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.currentOffer.currentOffer);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const reviews = useAppSelector((state) => state.currentOffer.reviews);
  const nearOffers = useAppSelector((state) => state.currentOffer.nearOffers);
  const isCurrentOfferLoading = useAppSelector((state) => state.currentOffer.isCurrentOffersLoading);
  const isReviewsLoading = useAppSelector((state) => state.currentOffer.isReviewsLoading);
  const isNearOffersLoading = useAppSelector((state) => state.currentOffer.isNearOffersLoading);
  const favorites = useAppSelector((state) => state.user.favoriteOffers);
  const isFavorite = favorites.some((item) => item.id === offer?.id);

  const navigate = useNavigate();

  const handleClickOnFavorite = useCallback(() => {
    if (authorizationStatus === 'auth' && offer) {
      dispatch(changeFavoriteStatus({
        id: offer.id,
        status: isFavorite ? 0 : 1,
      }));
    } else {
      navigate(PATHS.Login);
    }
  }, [navigate, authorizationStatus, dispatch, offer, isFavorite]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchReviews(id));
      dispatch(fetchNearOffers(id));
    }
    return () => {
      dispatch(loadCurrentOffer(null));
      dispatch(loadReviews([]));
      dispatch(loadNearOffers([]));
    };
  }, [dispatch, id]);

  const galleryImages = useMemo(
    () => offer?.images?.map((image) => <ImageWrapper key={image} image={image} />) || [],
    [offer],
  );

  const insideItems = useMemo(
    () => offer?.goods?.map((good) => <FeatureItem key={good} feature={good} />) || [],
    [offer],
  );

  const reviewsSection = useMemo(
    () => (
      <section className="offer__reviews reviews">
        <h2 className="reviews__title">
          Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
        </h2>
        {isReviewsLoading ? (
          <Spinner />
        ) : (
          <ReviewsList reviews={reviews} />
        )}
        <ReviewForm />
      </section>
    ),
    [reviews, isReviewsLoading],
  );

  const nearOffersSection = useMemo(
    () => (
      isNearOffersLoading ? (
        <Spinner />
      ) : (
        <NearOffersList offers={nearOffers} />
      )
    ),
    [nearOffers, isNearOffersLoading],
  );

  const bookmarkButtonClassName = useMemo(
    () => `offer__bookmark-button ${isFavorite && 'offer__bookmark-button--active'} button`,
    [isFavorite],
  );

  const ratingWidth = useMemo(() => offer?.rating ? `${offer.rating * 20}%` : '0%', [offer]);

  if (isCurrentOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <h1>Not found</h1>;
  }

  return (
    <div className="page">
      <Header shouldShowNav />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {galleryImages}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                {offer.isPremium && <span>Premium</span>}
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  onClick={handleClickOnFavorite}
                  className={bookmarkButtonClassName}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {insideItems}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              {reviewsSection}
            </div>
          </div>
          <MapWrapper type={'offer'} city={offer.city} offers={[...nearOffers.slice(0, 3), offer]} selectedOffer={offer} />
        </section>
        {nearOffersSection}
      </main>
    </div>
  );
}
