import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ paddingInline: '20px' }}>
      <h1>Page not found.</h1>
      <Link to="/">
        <h4>На главную</h4>
      </Link>
    </div>
  );
}
