import React, { useRef, useEffect } from 'react';

import { giftTemplate } from '../Content/modules/loggers/termal/templates';

export const GiftTemplate = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    giftTemplate(
      {
        type: 'Gift',
        user: {
          pictureUrl:
            'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/c6c32aeac65bc84f566c455b7ac685e8~tplv-tiktok-shrink:72:72.webp?x-expires=1647741600&x-signature=S9UR1QTX%2FbCjLhpi8tsJ%2B%2F8Kal0%3D',
          username: '@thanhcuchipro',
        },
        gift: {
          id: 'https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/802a21ae29f9fae5abe3693de9f874bd~tplv-obj.png',
          imageUrl:
            'https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/802a21ae29f9fae5abe3693de9f874bd~tplv-obj.png',
          name: 'TikTok',
          value: 1,
        },
        amount: 1,
      } as any,
      canvas as any
    );
  }, []);

  return <canvas ref={canvasRef} />;
};
