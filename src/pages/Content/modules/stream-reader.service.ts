import { BehaviorSubject } from 'rxjs';

import { Gift, GiftService } from './gifts.service';
import { parseFollowFromNode } from './parsers/follow.parser';
import { parseGiftFromNode } from './parsers/gift.parser';
import { parseLikeFromNode } from './parsers/like.parser';

export enum SystemEventEnum {
  Error = 'Error',
  Init = 'Init',
  Gift = 'Gift',
  Like = 'Like',
  Follow = 'Follow',
  Enter = 'Enter',
}

export interface User {
  username: string;
  pictureUrl?: string;
}

export interface SystemEvent {
  type: SystemEventEnum;
  user?: User;
}

export interface GiftProvided extends SystemEvent {
  gift?: Gift;
  amount?: number;
}

export type VariousSystemEvents = SystemEvent | GiftProvided;

export class StreamReader {
  private observer: MutationObserver | undefined;
  private observerConfig = { attributes: true, childList: true, subtree: true };

  private giftService: GiftService = new GiftService();

  private systemEventStream$: BehaviorSubject<VariousSystemEvents> =
    new BehaviorSubject({ type: SystemEventEnum.Init } as SystemEvent);

  start() {
    this.observer = new MutationObserver(this.handler);
    const giftNode = document.querySelectorAll(
      '[class*="-DivChatMessageList"]'
    )[0];
    this.observer.observe(giftNode, this.observerConfig);

    return this.systemEventStream$.asObservable();
  }

  stop() {
    this.observer?.disconnect();
  }

  handler = (mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
      const systemNodes: HTMLUnknownElement[] = this.onlySystemMsgs(
        mutation.addedNodes
      );
      if (systemNodes.length) {
        //console.log('system msg', systemNodes);

        systemNodes.forEach((node) => {
          this.processSystemMessage(node);
        });
      }
    }
  };

  private processSystemMessage = (node: HTMLUnknownElement) => {
    // Social Like
    if (node.className.includes('DivChatRoomMessage-StyledLikeMessageItem ')) {
      this.systemEventStream$.next(parseLikeFromNode(node));
    }
    // Social Follow
    else if (
      node.className.includes('DivChatRoomMessage-StyledSocialMessageItem ')
    ) {
      this.systemEventStream$.next(parseFollowFromNode(node));
      //console.log('Follow detected!', node);
    }
    // Enter Message
    else if (
      node.className.includes('DivChatRoomMessage-StyledEnterMessageContainer ')
    ) {
      //   console.log('Enter detected!', node);
      //   this.systemEventStream$.next({ type: SystemEventEnum.Enter });
    }
    // Gift given
    else if (node.className.includes('DivChatRoomMessage')) {
      //console.log('Gift detected!', node);
      this.systemEventStream$.next(parseGiftFromNode(node, this.giftService));
    }
    // Pass through
    else {
      console.log('Passthrough detected!', node);
      this.systemEventStream$.next({ type: SystemEventEnum.Error });
    }
  };

  private onlySystemMsgs = (nodes: any): HTMLUnknownElement[] => {
    const systemNodes: HTMLUnknownElement[] = [];
    nodes.forEach((node: HTMLUnknownElement) => {
      if (node.dataset.e2e !== 'chat-message' && !this.welcomeMsg(node)) {
        systemNodes.push(node);
      }
    });
    return systemNodes;
  };

  private welcomeMsg = (node: HTMLUnknownElement) => {
    return node.className.includes('DivChatRoomMessage-StyledRoomMessageItem');
  };
}
