import { VariousSystemEvents } from '../../../types';
import { createHorizontalLineAt } from '../utils';

export const followTemplate = (
  { user }: VariousSystemEvents,
  canvas: HTMLCanvasElement = document.createElement('canvas')
): HTMLCanvasElement => {
  canvas.width = 580;
  canvas.height = 110;

  var ctx = canvas.getContext('2d')!;
  ctx.font = 'bold 32px Open Sans';
  ctx.fillText(user?.username!, 0, 30);
  ctx.font = '32px Open Sans';
  ctx.fillText('TNX FOR', 450, 30);
  ctx.font = 'bold 85px Open Sans Bold';
  ctx.fillText('✰ FOLLOW ✰', 0, 100);

  createHorizontalLineAt(0, ctx);
  createHorizontalLineAt(110, ctx);

  return canvas;
};
