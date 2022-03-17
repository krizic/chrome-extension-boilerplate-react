import { createHorizontalLineAt } from './../utils/index';
import { VariousSystemEvents } from '../../../stream-reader.service';

export const likeTemplate = ({
  user,
}: VariousSystemEvents): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');

  canvas.width = 580;
  canvas.height = 40;

  var ctx = canvas.getContext('2d')!;

  ctx.font = 'bold 32px Open Sans';
  ctx.fillText(user?.username!, 0, 30);
  ctx.font = '32px Open Sans';
  ctx.fillText('❤sent likes❤', 395, 30);

  createHorizontalLineAt(0, ctx);
  createHorizontalLineAt(40, ctx);

  return canvas;
};
