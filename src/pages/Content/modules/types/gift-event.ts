import { Gift } from './gift.model';

import { SystemEvent } from './system-event.model';

export interface GiftEvent extends SystemEvent {
  gift?: Gift;
  amount?: number;
}
