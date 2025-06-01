import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div>
      <div className="not-found-container">
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <Link className="back-button" to="/">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
