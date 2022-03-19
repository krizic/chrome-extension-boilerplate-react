import { VariousSystemEvents } from '../../../types';
import { createHorizontalLineAt } from '../utils/index';

export const likeTemplate = (
  { user }: VariousSystemEvents,
  canvas: HTMLCanvasElement = document.createElement('canvas')
): HTMLCanvasElement => {
  canvas.width = 580;
  canvas.height = 40;

  var ctx = canvas.getContext('2d')!;

  ctx.font = '28px Open Sans';
  ctx.fillText(user?.username!, 0, 30);
  ctx.font = '32px Open Sans';
  ctx.fillText('❤sent likes❤', 380, 30);

  createHorizontalLineAt(0, ctx);
  createHorizontalLineAt(40, ctx);

  return canvas;
};
