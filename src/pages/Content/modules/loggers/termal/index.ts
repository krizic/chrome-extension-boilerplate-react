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

  giftHandler = async (event: VariousSystemEvents) => {
    console.log('gift received', event);
    const template = await giftTemplate(event);
    this.printerService.print(template);
    const persistedEvent = await this.eventService.persistEvent(event);
    console.log('gift persisted', persistedEvent);
  };

  likeHandler = async (event: VariousSystemEvents) => {
    console.log('like received', event);
    this.printerService.print(likeTemplate(event));
    const persistedEvent = await this.eventService.persistEvent(event);
    console.log('like persisted', persistedEvent);
  };

  followHandler = async (event: VariousSystemEvents) => {
    console.log('follow received', event);
    if (await this.eventService.isFollowEventOrganic(event)) {
      this.printerService.print(followTemplate(event));
      const persistedEvent = await this.eventService.persistEvent(event);
      console.log('follow persisted', persistedEvent);
    } else {
      console.log('follow rejected', event);
    }
  };
}
