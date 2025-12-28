import { Link } from 'react-router-dom';
import { PATHS } from '@/constants/paths/paths.ts';

export default function NotFoundPage() {
  return (
    <div style={{ paddingInline: '20px' }}>
      <h1>Page not found.</h1>
      <Link to={PATHS.Main}>
        <h4>На главную</h4>
      </Link>
    </div>
  );
}
