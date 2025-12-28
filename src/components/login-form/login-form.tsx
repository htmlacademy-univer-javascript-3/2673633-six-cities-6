import { useAppDispatch } from '@/hooks/use-app-dispatch/use-app-dispatch.ts';
import React, { useState, useCallback, useMemo } from 'react';
import { login } from '@/store/api-actions.ts';
import { PASSWORD_REGEX } from '@/constants/forms/forms.ts';

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const isPasswordValid = useMemo(
    () => PASSWORD_REGEX.test(password),
    [password]
  );

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  }, [dispatch, email, password]);

  return (
    <form className="login__form form" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit" disabled={!isPasswordValid}>
        Sign in
      </button>
    </form>
  );
}
