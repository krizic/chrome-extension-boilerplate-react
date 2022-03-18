import { SystemEventEnum } from './system-event.enum';
import { User } from './user.model';

export interface SystemEvent {
  type: SystemEventEnum;
  user?: User;
}
