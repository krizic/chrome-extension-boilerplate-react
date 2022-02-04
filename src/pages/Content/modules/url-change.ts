let url = location.href;

export const onSpaLocationChange = (callback: any) => {
  document.body.addEventListener(
    'click',
    () => {
      requestAnimationFrame(() => {
        if (url !== location.href) {
          callback(location.href);
          url = location.href;
        }
      });
    },
    true
  );
};
