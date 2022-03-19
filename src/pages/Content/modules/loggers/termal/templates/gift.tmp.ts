import { GiftEvent } from '../../../types';
import { createHorizontalLineAt, toDataUrl } from '../utils';

export const giftTemplate = (
  { user, gift, amount }: GiftEvent,
  canvas: HTMLCanvasElement = document.createElement('canvas')
): Promise<HTMLCanvasElement> => {
  // var c = document.createElement("canvas");

  const loadImage = (img: any) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => {
        resolve(img);
      };
    });
  };

  canvas.width = 580;
  canvas.height = 265;

  var ctx = canvas.getContext('2d')!;

  ctx.font = 'bold 32px Open Sans';
  ctx.fillText(user?.username!, 0, 30);
  ctx.font = '32px Open Sans Bold';
  ctx.fillText(`Sent ${amount}x`, 0, 100);
  ctx.font = 'bold 42px Open Sans Bold';
  ctx.fillText(gift?.name ?? 'GIFT', 0, 160);
  ctx.font = '48px Open Sans Bold';
  ctx.fillText('THANK YOU', 0, 250);

  return Promise.all([
    toDataUrl(user?.pictureUrl!),
    toDataUrl(gift?.imageUrl!),
  ]).then(([profileBase64, giftBase64]) => {
    const profileImage = new Image();
    const giftImage = new Image();
    const canvasLoaded = Promise.all([
      loadImage(profileImage),
      loadImage(giftImage),
    ]).then(([profileImageLoaded, giftImageLoaded]) => {
      ctx.drawImage(profileImageLoaded, 330, 5, 255, 255);

      ctx.beginPath();
      ctx.arc(540, 215, 50, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(580, 250, 50, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.drawImage(giftImageLoaded, 490, 165, 100, 100);

      createHorizontalLineAt(0, ctx);
      createHorizontalLineAt(265, ctx);

      return canvas;
    });

    profileImage.src = profileBase64;
    giftImage.src = giftBase64;
    return canvasLoaded;
  });
};
