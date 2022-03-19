import { ReplaySubject, zip } from 'rxjs';

declare global {
  interface Window {
    epson: any;
  }
}

export class PrinterService {
  ePosDev: any = null;
  printer: any = null;
  printerReady: boolean = false;

  printBuffer$: ReplaySubject<HTMLCanvasElement> = new ReplaySubject(1);
  printerStatus$: ReplaySubject<number> = new ReplaySubject(1);

  constructor() {
    var everythingLoaded = setInterval(() => {
      if (window.epson) {
        clearInterval(everythingLoaded);
        this.load(); // this is the function that gets called when everything is loaded
      }
    }, 10);

    zip([
      this.printBuffer$.asObservable(),
      this.printerStatus$.asObservable(),
    ]).subscribe(([canvas, timestamp]) => {
      this.print(canvas);
    });
  }

  load = () => {
    this.ePosDev = new window.epson.ePOSDevice();
    var ipAddress = '192.168.1.4';
    var port = '8008';
    this.ePosDev!.connect(ipAddress, port, this.callback_connect);
  };

  callback_connect = (resultConnect: any) => {
    var deviceId = 'local_printer';
    var options = { crypto: false, buffer: false };
    if (resultConnect == 'OK' || resultConnect == 'SSL_CONNECT_OK') {
      //Retrieves the Printer object
      this.ePosDev.createDevice(
        deviceId,
        this.ePosDev.DEVICE_TYPE_PRINTER,
        options,
        this.callback_createDevice
      );
      this.printerReady = true;
      this.printerStatus$.next(+new Date());
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
        //Displays the successful print message
        console.log('PRINTER reported COMPLETE', response);
        this.printerStatus$.next(+new Date());
      } else {
        console.log('PRINTER reported ERROR', response);
      }
    };
  };

  public requestPrint = (canvas: HTMLCanvasElement) => {
    this.printBuffer$.next(canvas);
  };

  private print = (canvas: HTMLCanvasElement) => {
    this.printer.print(canvas, false);
  };
}
