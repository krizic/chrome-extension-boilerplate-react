import $ from 'jquery';

export interface Gift {
  id: string;
  imageUrl: string;
  name: string;
  value: number;
}

export class GiftService {
  private _giftMap: Map<string, Gift> = new Map();

  constructor() {
    setTimeout(() => {
      const giftPalletNode = $('[class*="-DivGiftListContainer"]')[0];
      const $gifts = $('div[class*="-DivGiftItem"]', giftPalletNode);

      $gifts.each((index, element) => {
        const imageUrl =
          element.getElementsByTagName('img')[0].src ?? 'unknown';
        const giftDetailsDiv = element.getElementsByTagName('div')[0];
        const name =
          giftDetailsDiv.querySelectorAll('[class*="-DivGiftName"]')[0]
            .textContent ?? '';
        const value = parseInt(
          giftDetailsDiv.querySelectorAll('[class*="-DivGiftCoins"]')[0]
            .textContent ?? '0'
        );
        this._giftMap.set(imageUrl, {
          id: imageUrl,
          imageUrl: imageUrl,
          name,
          value,
        });
      });

      console.log('Gifts Service', $gifts, this._giftMap);
    }, 2000);
  }

  getGiftById(id: string): Gift | undefined {
    return this._giftMap.get(id);
  }
}
