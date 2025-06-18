'use client';

import { useSafeAreaInset } from '@/hooks';

type Position = 'top' | 'bottom' | 'left' | 'right';

export default function SafeAreaDetection({
  className,
  position,
}: {
  className?: string;
  position?: Position;
}) {
  const { insetTop, insetBottom, insetLeft, insetRight } = useSafeAreaInset();

  const style: React.CSSProperties = {
    width: '100%',
    ...(position === 'top' && { paddingTop: insetTop }),
    ...(position === 'bottom' && { paddingBottom: insetBottom }),
    ...(position === 'left' && { paddingLeft: insetLeft }),
    ...(position === 'right' && { paddingRight: insetRight }),
  };

  return <div className={className} style={style} />;
}
