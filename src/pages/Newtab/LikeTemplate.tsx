import React, { useRef, useEffect } from 'react';

import { likeTemplate } from '../Content/modules/loggers/termal/templates';

export const LikeTemplate = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    likeTemplate(
      {
        type: 'Like',
        user: {
          username: '@siddakidd27',
        },
      } as any,
      canvas as any
    );
  }, []);

  return <canvas ref={canvasRef} />;
};
