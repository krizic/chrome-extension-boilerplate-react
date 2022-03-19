import React, { useRef, useEffect } from 'react';

import { followTemplate } from '../Content/modules/loggers/termal/templates';

export const FollowTemplate = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    followTemplate(
      {
        type: 'Follow',
        user: {
          username: '@draven_muc',
        },
      } as any,
      canvas as any
    );
  }, []);

  return <canvas ref={canvasRef} />;
};
