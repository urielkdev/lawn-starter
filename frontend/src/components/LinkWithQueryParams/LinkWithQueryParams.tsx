import { Link, useLocation } from 'react-router-dom';

type LinkWithQueryParamsProps = {
  to: string;
  children: React.ReactNode;
  preserveQuery?: boolean;
  className?: string;
};

export function LinkWithQueryParams({
  to,
  children,
  preserveQuery = true,
  className,
}: LinkWithQueryParamsProps) {
  const location = useLocation();

  const fullTo = preserveQuery ? `${to}${location.search}` : to;

  return (
    <Link to={fullTo} className={className}>
      {children}
    </Link>
  );
}
