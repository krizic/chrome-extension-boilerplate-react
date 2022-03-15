import { GiftService } from '../gifts.service';
import { GiftProvided, SystemEventEnum } from './../stream-reader.service';

export const parseGiftFromNode = (
  node: HTMLUnknownElement,
  giftService: GiftService
): GiftProvided => {
  try {
    return {
      type: SystemEventEnum.Gift,
      user: {
        pictureUrl: node?.children[0].getElementsByTagName('img')[0].src,
        username: (
          node?.children[1]?.children[0]?.children[0] as HTMLSpanElement
        )?.innerText,
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
