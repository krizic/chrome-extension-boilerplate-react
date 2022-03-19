import { Subscription } from 'rxjs';

import { followTemplate, giftTemplate, likeTemplate } from './templates';
import { PrinterService } from './services/printer-client-wrapper';
import { StreamReader } from '../../stream-reader.service';
import { SystemEventEnum, VariousSystemEvents } from '../../types';
import { EventService } from '../../persistence/event.service';

export class ThermalReporter {
  private streamReader: StreamReader;
  private sub: Subscription = new Subscription();
  printerService: PrinterService;
  eventService: EventService;

  constructor() {
    const sessionIdentifier = `${window.location.pathname.split('/')[1]}-${
      new Date().toISOString().split(':')[0]
    }`;
    this.streamReader = new StreamReader();
    this.eventService = new EventService(sessionIdentifier);
    this.printerService = new PrinterService();
    this.restart().then();
  }

  async restart() {
    this.streamReader.stop();
    this.streamReader.start().subscribe((event) => {
      //const msg = new SpeechSynthesisUtterance();
      //console.log(event);

      switch (event.type) {
        case SystemEventEnum.Gift:
          this.giftHandler(event);
          break;
        case SystemEventEnum.Like:
          this.likeHandler(event);
          break;
        case SystemEventEnum.Follow:
          this.followHandler(event);
          break;
        default:
          break;
      }
    });
  }

  giftHandler = (event: VariousSystemEvents) => {
    try {
      console.log('gift received', event);
      giftTemplate(event).then((template) => {
        this.printerService.requestPrint(template);
      });

      this.eventService.persistEvent(event).then((persistedEvent) => {
        console.log('gift persisted', persistedEvent);
      });
    } catch (e) {
      console.log('ERROR - gift handler', e);
    }
  };

  likeHandler = async (event: VariousSystemEvents) => {
    console.log('like received', event);
    this.printerService.requestPrint(likeTemplate(event));
    const persistedEvent = await this.eventService.persistEvent(event);
    console.log('like persisted', persistedEvent);
  };

  followHandler = async (event: VariousSystemEvents) => {
    console.log('follow received', event);
    if (await this.eventService.isFollowEventOrganic(event)) {
      this.printerService.requestPrint(followTemplate(event));
      const persistedEvent = await this.eventService.persistEvent(event);
      console.log('follow persisted', persistedEvent);
    } else {
      console.log('follow rejected', event);
    }
  };
}
