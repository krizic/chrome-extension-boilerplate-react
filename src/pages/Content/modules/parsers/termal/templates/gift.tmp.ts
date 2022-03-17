import { GiftProvided } from '../../../stream-reader.service';
import { createHorizontalLineAt, toDataUrl } from '../utils';

export const likeTemplate = async ({
  user,
  gift,
  amount,
}: GiftProvided): Promise<HTMLCanvasElement> => {
  // var c = document.createElement("canvas");
  const canvas = document.createElement('canvas');
  canvas.width = 580;
  canvas.height = 265;

  var ctx = canvas.getContext('2d')!;

  ctx.font = 'bold 40px Open Sans';
  ctx.fillText(user?.username!, 0, 40);
  ctx.font = '32px Open Sans Bold';
  ctx.fillText(`Sent ${amount}x`, 0, 100);
  ctx.font = 'bold 48px Open Sans Bold';
  ctx.fillText('ROSE', 0, 160);
  ctx.font = '48px Open Sans Bold';
  ctx.fillText('THANK YOU', 0, 250);

  var profileImage = new Image();
  profileImage.onload = function () {
    ctx.drawImage(profileImage, 330, 5, 255, 255);
  };

  profileImage.src = await toDataUrl(user?.pictureUrl!);

  var giftImage = new Image();
  giftImage.onload = function () {
    ctx.drawImage(giftImage, 480, 165, 100, 100);
  };

  giftImage.src = await toDataUrl(gift?.imageUrl!);

  ctx.beginPath();
  ctx.arc(530, 210, 50, 0, 2 * Math.PI, false);
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

  createHorizontalLineAt(0, ctx);
  createHorizontalLineAt(265, ctx);

  return canvas;
};
