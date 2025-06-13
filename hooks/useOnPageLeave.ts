import { useEffect } from 'react';

type UseOnPageLeaveOptions = {
  onLeave: () => void;
  useBeforeUnload?: boolean; // for hard exit: refresh/close
  useVisibilityChange?: boolean; // for soft exit: tab switch, minimize
};

export function useOnPageLeave({
  onLeave,
  useBeforeUnload = true,
  useVisibilityChange = false,
}: UseOnPageLeaveOptions) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      onLeave();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        onLeave();
      }
    };

    if (useBeforeUnload) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    if (useVisibilityChange) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      if (useBeforeUnload) {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
      if (useVisibilityChange) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
  }, [onLeave, useBeforeUnload, useVisibilityChange]);
}
