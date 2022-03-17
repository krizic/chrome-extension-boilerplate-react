import { printLine } from './modules/print';
import { onSpaLocationChange } from './modules/url-change';
import { LoggerReporter } from './modules/logger-reporter.service';
import { ThermalReporter } from './modules/loggers/termal';

declare global {
  interface Window {
    epson: any;
    callback_createDevice: any;
    callback_connect: any;
    printer: any;
  }
}

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

    new ThermalReporter();
  }
};

onPageChange(location.href);

onSpaLocationChange((currentUrl: string) => {
  onPageChange(currentUrl);
});

// var ePosDev = new window.epson.ePOSDevice();
// (function connect() {
//   var ipAddress = '192.168.1.4';
//   var port = '8008';
//   ePosDev.connect(ipAddress, port, callback_connect);
// })();

// function callback_connect(resultConnect) {
//   var deviceId = 'local_printer';
//   var options = { crypto: false, buffer: false };
//   if (resultConnect == 'OK' || resultConnect == 'SSL_CONNECT_OK') {
//     //Retrieves the Printer object
//     ePosDev.createDevice(
//       deviceId,
//       ePosDev.DEVICE_TYPE_PRINTER,
//       options,
//       callback_createDevice
//     );
//     console.log('Printer created');
//   } else {
//     //Displays error messages
//   }
// }

// window.printer = null;
// function callback_createDevice(deviceObj, errorCode) {
//   debugger;
//   if (deviceObj === null) {
//     //Displays an error message if the system fails to retrieve the Printer object
//     return;
//   }
//   window.printer = deviceObj;
//   //Registers the print complete event
//   window.printer.onreceive = function (response) {
//     if (response.success) {
//       console.log('Printer reported success', response);
//       //Displays the successful print message
//     } else {
//       //Displays error messages
//     }
//   };
// }

// (function createCanvasLike() {
//   const c = document.createElement('canvas');
//   // var c = document.getElementById("canvasLike");
//   c.width = 580;
//   c.height = 40;
//   var ctx = c.getContext('2d')!;
//   ctx.font = 'bold 32px Open Sans';
//   ctx.fillText('@draven_muc', 0, 30);
//   ctx.font = '32px Open Sans';
//   ctx.fillText('❤sent likes❤', 395, 30);

//   // createHorizontalLineAt(0, ctx);
//   // createHorizontalLineAt(40, ctx);

//   window.printer.print(c, false);
// })();
