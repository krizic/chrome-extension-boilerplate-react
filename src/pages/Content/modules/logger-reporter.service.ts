import { Subscription } from 'rxjs';
import { StreamReader } from './stream-reader.service';
import { GiftEvent, SystemEventEnum } from './types';

export class LoggerReporter {
  private streamReader: StreamReader;
  private sub: Subscription = new Subscription();

  /**
   *
   */
  constructor() {
    this.streamReader = new StreamReader();
    this.restart();
  }

  handleGift = ({ user, gift, amount }: GiftEvent): string => {
    const giftDeclaration = gift?.name
      ? `${amount} ${gift.name}`
      : `an amazing gift`;
    return `Thank you ${user?.username} for sending ${giftDeclaration}`;
  };

  restart() {
    this.streamReader.stop();
    this.streamReader.start().subscribe((event) => {
      const msg = new SpeechSynthesisUtterance();

      switch (event.type) {
        case SystemEventEnum.Gift:
          const giftText = this.handleGift(event as GiftEvent);
          msg.text = giftText;
          window.speechSynthesis.speak(msg);
          console.log(
            `%c${giftText}`,
            'color: #4ECDC4; font-weight: bold; font-size: 16px;color: white;'
          );
          break;
        case SystemEventEnum.Like:
          console.log(
            `%c$${event.user?.username} likes the stream!`,
            'color: #FF6B6B; font-weight: 600'
          );
          break;
        case SystemEventEnum.Follow:
          msg.text = `${event.user?.username} thank you for the follow!`;
          window.speechSynthesis.speak(msg);
          console.log(`%c${msg.text}`, 'color: #C7F464; font-weight: 500');
          break;

        default:
          break;
      }
    });
  }
}
