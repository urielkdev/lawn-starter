import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LinkWithQueryParams } from '../../components/LinkWithQueryParams/LinkWithQueryParams';
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
        <LinkWithQueryParams className="back-button" to="/">
          Return to Home
        </LinkWithQueryParams>
      </div>
    </div>
  );
};

export default NotFoundPage;
