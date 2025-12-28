export enum API_ACTION {
  FetchOffers = 'fetchOffers',
  FetchOffer = 'fetchOffer',
  FetchReviews = 'fetchReviews',
  FetchNearOffers = 'fetchNearOffers',
  Login = 'login',
  CheckAuth = 'checkAuth',
  Logout = 'logout',
  SendReview = 'sendReview',
  FetchFavoriteOffers = 'fetchFavoriteOffers',
  ChangeFavoriteStatus = 'changeFavoriteStatus',
}

export enum TOAST_MESSAGES {
  FetchOffersError = 'Не удалось загрузить предложения',
  FetchOfferError = 'Не удалось загрузить предложение',
  FetchNearOffersError = 'Не удалось загрузить похожие предложения',
  FetchReviewsError = 'Не удалось загрузить отзывы',
  SendReviewSuccess = 'Отзыв отправлен',
  SendReviewError = 'Не удалось отправить отзыв',
  LoginSuccess = 'Вы успешно вошли',
  LoginError = 'Не удалось войти',
  LogoutSuccess = 'Вы вышли из аккаунта',
  LogoutError = 'Ошибка при выходе',
  FetchFavoriteOffersError = 'Не удалось загрузить избранное',
  ChangeFavoriteStatusError = 'Не удалось изменить статус',
}
