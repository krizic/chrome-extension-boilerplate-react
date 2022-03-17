export const createHorizontalLineAt = (
  y: number,
  ctx: CanvasRenderingContext2D
) => {
  // set line stroke and line width
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  // draw a red line
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(600, y);
  ctx.stroke();
};

export const toDataUrl = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
};
