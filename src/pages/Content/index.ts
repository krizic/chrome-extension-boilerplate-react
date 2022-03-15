import { printLine } from './modules/print';
import { onSpaLocationChange } from './modules/url-change';
import { LoggerReporter } from './modules/logger-reporter.service';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

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

    new LoggerReporter();
  }
};

onPageChange(location.href);

onSpaLocationChange((currentUrl: string) => {
  onPageChange(currentUrl);
});
