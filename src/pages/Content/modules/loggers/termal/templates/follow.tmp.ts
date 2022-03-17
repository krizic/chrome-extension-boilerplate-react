import { VariousSystemEvents } from '../../../stream-reader.service';
import { createHorizontalLineAt } from '../utils';

export const followTemplate = ({
  user,
}: VariousSystemEvents): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');

  canvas.width = 580;
  canvas.height = 130;

  var ctx = canvas.getContext('2d')!;
  ctx.font = 'bold 40px Open Sans';
  ctx.fillText(user?.username!, 0, 40);
  ctx.font = '40px Open Sans';
  ctx.fillText('TNX FOR', 410, 40);
  ctx.font = 'bold 85px Open Sans Bold';
  ctx.fillText('✰ FOLLOW ✰', 0, 120);

  createHorizontalLineAt(0, ctx);
  createHorizontalLineAt(130, ctx);

  return canvas;
};
