import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/use-app-selector.ts';
import React from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch.ts';
import { logout } from '@/store/api-actions.ts';

export default function HeaderNav() {
  const status = useAppSelector((state) => state.authorizationStatus);
  const email = useAppSelector((state) => state.email);
  const avatarUrl = useAppSelector((state) => state.avatarUrl);
  const favorites = useAppSelector((state) => state.favoriteOffers);
  const dispatch = useAppDispatch();

  const handleClickSignOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          status === 'auth' ? (
            <>
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    {avatarUrl && <img style={{ borderRadius: '50%' }} src={avatarUrl} alt="avatar" />}
                  </div>
                  <span className="header__user-name user__name">{email}</span>
                  <span className="header__favorite-count">{favorites.length}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to="#" onClick={handleClickSignOut}>
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </>
          ) : (
            <li className="header__nav-item">
              <Link className="header__nav-link" to="/login">
                <span className="header__signout">Sign in</span>
              </Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
}
