import { printLine } from './modules/print';
import { onSpaLocationChange } from './modules/url-change';
import { ThermalReporter } from './modules/loggers/termal';

declare global {
  interface Window {
    epson: any;
    callback_createDevice: any;
    callback_connect: any;
    printer: any;
  }
}

printLine(
  `Using the 'printLine' function from the Print Module - ${location.href}`
);

// check if needed
window.addEventListener('locationchange', function () {
  console.log('location changed!');
});

const onPageChange = (currentUrl: string) => {
  printLine('location has changed!!!');
  if (currentUrl.match('www.tiktok.com/@(.)*/live')) {
    console.log(`watching live! - ${currentUrl}`);
    new ThermalReporter();
  }
};

onPageChange(location.href);

onSpaLocationChange((currentUrl: string) => {
  onPageChange(currentUrl);
});
