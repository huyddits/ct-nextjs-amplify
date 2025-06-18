import { SafeArea } from 'capacitor-plugin-safe-area';
import { useState, useEffect } from 'react';
export const useSafeAreaInset = () => {
  const [insetTop, setInsetTop] = useState(0);
  const [insetBottom, setInsetBottom] = useState(0);
  const [insetLeft, setInsetLeft] = useState(0);
  const [insetRight, setInsetRight] = useState(0);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    (async function () {
      const safeAreaData = await SafeArea.getSafeAreaInsets();
      const { insets } = safeAreaData;
      for (const [key, value] of Object.entries(insets)) {
        document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
      }

      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const styles = getComputedStyle(document.documentElement);
    const top = styles.getPropertyValue('--safe-area-inset-top').trim();
    const bottom = styles.getPropertyValue('--safe-area-inset-bottom').trim();
    const left = styles.getPropertyValue('--safe-area-inset-left').trim();
    const right = styles.getPropertyValue('--safe-area-inset-right').trim();
    setInsetTop(parseInt(top, 10));
    setInsetBottom(parseInt(bottom, 10));
    setInsetLeft(parseInt(left, 10));
    setInsetRight(parseInt(right, 10));
  }, [isReady]);

  return {
    insetTop,
    insetBottom,
    insetLeft,
    insetRight,
  };
};
