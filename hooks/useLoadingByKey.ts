import { useState } from 'react';

type LoadingMap = {
  [key: string]: boolean;
};

export const useLoadingByKey = () => {
  const [loadingMap, setLoadingMap] = useState<LoadingMap>({});

  const startLoading = (key: string) => {
    setLoadingMap(prev => ({ ...prev, [key]: true }));
  };

  const stopLoading = (key: string) => {
    setLoadingMap(prev => ({ ...prev, [key]: false }));
  };

  const isLoading = (key: string) => !!loadingMap[key];

  return {
    startLoading,
    stopLoading,
    isLoading,
  };
};
