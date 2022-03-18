import { GiftService } from '../gifts.service';
import { GiftEvent, SystemEventEnum } from '../types';

export const parseGiftFromNode = (
  node: HTMLUnknownElement,
  giftService: GiftService
): GiftEvent => {
  try {
    return {
      type: SystemEventEnum.Gift,
      user: {
        pictureUrl: node?.children[0].getElementsByTagName('img')[0].src,
        username: `@${
          (node?.children[1]?.children[0]?.children[0] as HTMLSpanElement)
            ?.innerText
        }`,
      },
      gift: giftService.getGiftById(
        (
          node?.children[1]?.children[1]?.children[1]
            ?.children[0] as HTMLImageElement
        ).src
      ),
      amount: parseInt(
        ((
          node?.children[1]?.children[1]?.children[2] as HTMLSpanElement
        )?.innerText).substring(1)
      ),
    };
  } catch (ex) {
    console.log('Error in Gift Parser');
    return { type: SystemEventEnum.Error };
  }
};
