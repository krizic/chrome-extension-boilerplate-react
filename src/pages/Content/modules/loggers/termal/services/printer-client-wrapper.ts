declare global {
  interface Window {
    epson: any;
  }
}

export class PrinterService {
  ePosDev: any = null;
  printer: any = null;
  printerReady: boolean = false;

  constructor() {
    var everythingLoaded = setInterval(() => {
      if (window.epson) {
        clearInterval(everythingLoaded);
        this.load(); // this is the function that gets called when everything is loaded
      }
    }, 10);
  }

  load = () => {
    this.ePosDev = new window.epson.ePOSDevice();
    var ipAddress = '192.168.1.4';
    var port = '8008';
    this.ePosDev!.connect(ipAddress, port, this.callback_connect);
  };

  public print = (canvas: HTMLCanvasElement) => {
    if (this.printerReady) {
      this.printer.print(canvas, false);
    }
  };

  callback_connect = (resultConnect: any) => {
    var deviceId = 'local_printer';
    var options = { crypto: false, buffer: false };
    this.printerReady = true;
    if (resultConnect == 'OK' || resultConnect == 'SSL_CONNECT_OK') {
      //Retrieves the Printer object
      this.ePosDev.createDevice(
        deviceId,
        this.ePosDev.DEVICE_TYPE_PRINTER,
        options,
        this.callback_createDevice
      );
      this.printerReady = true;
    } else {
      //Displays error messages
    }
  };

  callback_createDevice = (deviceObj: any, errorCode: any) => {
    if (deviceObj === null) {
      //Displays an error message if the system fails to retrieve the Printer object
      return;
    }
    this.printer = deviceObj;
    //Registers the print complete event
    this.printer!.onreceive = (response: any) => {
      if (response.success) {
        console.log('Printer reported success', response);
        //Displays the successful print message
      } else {
        //Displays error messages
      }
    };
  };
}
