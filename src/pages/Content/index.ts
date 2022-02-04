import $ from 'jquery';
import { printLine } from './modules/print';
import { onSpaLocationChange } from './modules/url-change';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine(
  `Using the 'printLine' function from the Print Module - ${location.href}`
);

// check if needed
window.addEventListener('locationchange', function () {
  console.log('location changed!');
});

const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function (mutationsList: MutationRecord[], observer: any) {
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    //   console.log(
    //     'A child node has been added or removed.',
    //     mutation,
    //     observer
    //   );
    if (mutation.addedNodes?.length) {
      const giftInfo = $(
        '[class*="-DivSendGiftBarContent"]',
        mutation.addedNodes
      )[0];
      const giftCount = document.querySelectorAll(
        '[class*="-DivSendGiftCount"]'
      )[0];
      const textItem = `${giftInfo.children[0].innerHTML} - ${giftInfo.children[1].innerHTML} x ${giftCount.children[1].innerHTML}`;
      console.log(textItem);
    }
  }
};
const observer = new MutationObserver(callback);

const onPageChange = (currentUrl: string) => {
  printLine('location has changed!!!');
  const observer = new MutationObserver(callback);
  if (currentUrl.match('www.tiktok.com/@(.)*/live')) {
    console.log(`watching live! - ${currentUrl}`);

    observer.disconnect();

    const giftNode = document.querySelectorAll('[class*="-StyledGiftTray"]')[0];
    observer.observe(giftNode, config);
  }
};

onPageChange(location.href);

onSpaLocationChange((currentUrl: string) => {
  onPageChange(currentUrl);
});
