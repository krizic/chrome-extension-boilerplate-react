import { giftTemplate } from './templates/gift.tmp';
import { followTemplate } from './templates/follow.tmp';
import { Subscription } from 'rxjs';
import {
  StreamReader,
  SystemEventEnum,
  GiftProvided,
} from '../../stream-reader.service';
import { PrinterService } from './services/printer-client-wrapper';
import { likeTemplate } from './templates/like.tmp';

export class ThermalReporter {
  private streamReader: StreamReader;
  private sub: Subscription = new Subscription();
  printerService: PrinterService;

  /**
   *
   */
  constructor() {
    this.streamReader = new StreamReader();
    this.printerService = new PrinterService();
    this.restart().then();
  }

  //   handleGift = ({ user, gift, amount }: GiftProvided): string => {
  //     const giftDeclaration = gift?.name
  //       ? `${amount} ${gift.name}`
  //       : `an amazing gift`;
  //     return `Thank you ${user?.username} for sending ${giftDeclaration}`;
  //   };

  async restart() {
    this.streamReader.stop();
    this.streamReader.start().subscribe(async (event) => {
      //const msg = new SpeechSynthesisUtterance();
      switch (event.type) {
        case SystemEventEnum.Gift:
          console.log('gift received', event);
          const tmp = await giftTemplate(event);
          this.printerService.print(tmp);
          break;
        case SystemEventEnum.Like:
          console.log('like received', event);
          this.printerService.print(likeTemplate(event));
          break;
        case SystemEventEnum.Follow:
          this.printerService.print(followTemplate(event));
          console.log('follow received', event);
          break;

        default:
          break;
      }
    });
  }
}
