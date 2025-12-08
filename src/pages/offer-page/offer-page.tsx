import Header from '@/widgets/header/header.tsx';
import ReviewForm from '@/components/review-form/review-form.tsx';
import ReviewsList from '@/components/reviews-list/reviews-list.tsx';
import NearOffersList from '@/components/nearby-offers-list/near-offers-list.tsx';
import MapWrapper from '@/components/map-wrapper/map-wrapper.tsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch.ts';
import { fetchNearOffers, fetchOffer, fetchReviews } from '@/store/api-actions.ts';
import { loadCurrentOffer, loadNearOffers, loadReviews } from '@/store/actions.ts';
import { useAppSelector } from '@/hooks/use-app-selector.ts';
import { Offer } from '@/types/offer.ts';
import Spinner from '@/components/spinner/spinner.tsx';

export default function OfferPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.currentOffer);
  const reviews = useAppSelector((state) => state.reviews);
  const nearOffers = useAppSelector((state) => state.nearOffers);
  const isCurrentOfferLoading = useAppSelector((state) => state.isCurrentOffersLoading);
  const isReviewsLoading = useAppSelector((state) => state.isReviewsLoading);
  const isNearOffersLoading = useAppSelector((state) => state.isNearOffersLoading);

  const [activeCard, setActiveCard] = useState<Offer | null>(null);

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
        {
          isCurrentOfferLoading ? (
            <Spinner />
          ) : (
            <>
              <section className="offer">
                <div className="offer__gallery-container container">
                  <div className="offer__gallery">
                    {offer.images.map((image) => (
                      <div key={image} className="offer__image-wrapper">
                        <img className="offer__image" src={image} alt="Photo studio" />
                      </div>
                    ))}
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
                        className={`offer__bookmark-button ${offer.isFavorite && 'offer__bookmark-button--active'} button`}
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
                        <span style={{ width: `${offer.rating * 20}%` }}></span>
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
                        {offer.goods.map((good) => (
                          <li key={good} className="offer__inside-item">{good}</li>
                        ))}
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
                    <section className="offer__reviews reviews">
                      <h2 className="reviews__title">
                        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                      </h2>
                      {
                        isReviewsLoading ? (
                          <Spinner />
                        ) : (
                          <ReviewsList reviews={reviews} />
                        )
                      }
                      <ReviewForm />
                    </section>
                  </div>
                </div>
                <MapWrapper type={'offer'} city={offer.city} offers={nearOffers} selectedOffer={activeCard} />
              </section>
              {
                isNearOffersLoading ? (
                  <Spinner />
                ) : (
                  <NearOffersList offers={nearOffers} setActiveCard={setActiveCard} />
                )
              }
            </>
          )
        }
      </main>
    </div>
  );
}
