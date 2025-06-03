import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useStateFromQueryParam = <T,>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [queryParams] = useSearchParams();
  const queryParam = queryParams.get(key);

  const [value, setValue] = useState<T>(
    queryParam ? (queryParam as T) : defaultValue
  );

  return [value, setValue];
};
