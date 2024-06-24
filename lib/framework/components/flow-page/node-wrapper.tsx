import { ReactNode, useState, useRef, useEffect } from 'react';

export const NodeWrapper = ({ children }: { children: ReactNode }) => {
  const [dimensions, setDimensions] = useState<Record<string, string | number>>({ width: '100%', height: '100%' });
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childrenRef.current) {
      const { width, height } = childrenRef.current.getBoundingClientRect();

      setDimensions({ width, height });
    }
  }, [children]);

  return (
    <foreignObject height={dimensions.height} width={dimensions.width}>
      <div
        ref={childrenRef}
        style={{
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        {children}
      </div>
    </foreignObject>
  );
};
