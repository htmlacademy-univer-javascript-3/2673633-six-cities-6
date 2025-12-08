import Header from '@/widgets/header/header.tsx';
import LoginForm from '@/components/login-form/login-form.tsx';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/use-app-selector.ts';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (status === 'auth') {
      navigate('/');
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
}
