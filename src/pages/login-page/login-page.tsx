import Header from '@/widgets/header/header.tsx';
import LoginForm from '@/components/login-form/login-form.tsx';
import { useAppSelector } from '@/hooks/use-app-selector/use-app-selector.ts';
import { useNavigate } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { PATHS } from '@/constants/constants.ts';

const LoginPage = memo(() => {
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.user.authorizationStatus);

  useEffect(() => {
    if (status === 'auth') {
      navigate(PATHS.Main);
    }
  }, [status, navigate]);

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
});

LoginPage.displayName = 'LoginPage';

export default LoginPage;
