import React from 'react'
import { Offer } from '@/types/offer.ts'
import { Link } from 'react-router-dom'

type CardType = 'cities' | 'favorites'

type CardProps = {
  offer: Offer
  type: CardType
} & React.HTMLAttributes<HTMLDivElement>

const getDimensions = (type: CardType) => {
  switch (type) {
    case 'favorites':
      return { width: 150, height: 110 }
    case 'cities':
      return { width: 260, height: 200 }
  }
}

export default function Card({ offer, type, onMouseEnter, onMouseLeave }: CardProps) {
  const { width, height } = getDimensions(type)

  return (
    <article
      className={`${type}__card place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${type}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={width}
            height={height}
            alt="Place image" />
        </Link>
      </div>
      <div className={`${type}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite && 'place-card__bookmark-button--active'} button`}
            type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  )
}
