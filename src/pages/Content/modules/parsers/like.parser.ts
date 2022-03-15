import { SystemEvent, SystemEventEnum } from './../stream-reader.service';

export const parseLikeFromNode = (node: HTMLUnknownElement): SystemEvent => {
  try {
    return {
      type: SystemEventEnum.Like,
      user: {
        username: (
          node?.children[1]?.children[0]?.children[0] as HTMLSpanElement
        )?.innerText,
      },
    };
  } catch (ex) {
    console.log('Error in Like Parser');
    return { type: SystemEventEnum.Error };
  }
};
