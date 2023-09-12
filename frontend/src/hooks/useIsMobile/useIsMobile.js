import { useState, useEffect } from 'react';

const useIsMobile = (width) => {
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(width);

    const handleMediaChange = (event) => {
      setSmallScreen(event.matches);
    };

    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, [width]);

  return smallScreen;
};

export default useIsMobile;
