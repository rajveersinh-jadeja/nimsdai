import React, { useEffect, useRef, useState } from 'react';
import NumberFlow, { type Value } from '@number-flow/react';

export { NumberFlow };

interface AnimatedNumberProps {
  value: number;
  className?: string;
  format?: React.ComponentProps<typeof NumberFlow>['format'];
  startValue?: number;
}

export function AnimatedNumber({
  value,
  className,
  format = { useGrouping: true },
  startValue = 0,
}: AnimatedNumberProps) {
  const [currentValue, setCurrentValue] = useState<Value>(startValue);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setCurrentValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentValue(value);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <NumberFlow value={currentValue} format={format} />
    </span>
  );
}
