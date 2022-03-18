import { SystemEvent, SystemEventEnum } from '../types';

export const parseFollowFromNode = (node: HTMLUnknownElement): SystemEvent => {
  try {
    return {
      type: SystemEventEnum.Follow,
      user: {
        username: `@${
          (node?.children[1]?.children[0]?.children[0] as HTMLSpanElement)
            ?.innerText
        }`,
      },
    };
  } catch (ex) {
    console.log('Error in Follow Parser');
    return { type: SystemEventEnum.Error };
  }
};
