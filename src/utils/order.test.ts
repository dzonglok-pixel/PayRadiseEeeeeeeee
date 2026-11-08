import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUPPORT_URL,
  MANAGER_URL,
  buildBuyOrderMessage,
  buildBuyOrderUrl,
  buildSellMessage,
  buildSellUrl,
} from './order.ts';

test('constants point to requested Telegram accounts', () => {
  assert.equal(SUPPORT_URL, 'https://t.me/PayRadiseSupport');
  assert.equal(MANAGER_URL, 'https://t.me/PayRadiseManager');
});

test('buildBuyOrderMessage formats order with trade delivery', () => {
  const text = buildBuyOrderMessage({
    gameName: 'BLACK RUSSIA',
    serverName: 'RED',
    nickname: 'CoolPlayer',
    deliveryMethod: 'trade',
    virtualAmount: 10,
    rate: 50,
    rateSuffix: '₽ / 1кк',
    total: 500,
  });

  assert.match(text, /🎮 Игра: BLACK RUSSIA/);
  assert.match(text, /🌐 Сервер: RED/);
  assert.match(text, /👤 Никнейм: CoolPlayer/);
  assert.match(text, /📦 Способ получения: Трейд/);
  assert.match(text, /💰 Количество: 10 кк/);
  assert.match(text, /💳 К оплате: 500 ₽/);
});

test('buildBuyOrderMessage includes bank account and promo code', () => {
  const text = buildBuyOrderMessage({
    gameName: 'BLACK RUSSIA',
    serverName: 'MOSCOW',
    nickname: 'ProTrader',
    deliveryMethod: 'bank',
    bankAccount: '123456',
    virtualAmount: 20,
    rate: 50,
    rateSuffix: '₽ / 1кк',
    promoCode: 'START5',
    promoDiscount: 50,
    total: 950,
  });

  assert.match(text, /Банковский счёт \(№ 123456\)/);
  assert.match(text, /🏷️ Промокод: START5/);
  assert.match(text, /скидка 50 ₽/);
  assert.match(text, /💳 К оплате: 950 ₽/);
});

test('buildBuyOrderUrl creates valid link to @PayRadiseManager with prefilled order text', () => {
  const url = buildBuyOrderUrl({
    gameName: 'STANDOFF 2',
    serverName: 'STANDOFF 2',
    nickname: 'Sniper',
    deliveryMethod: 'market',
    virtualAmount: 500,
    rate: 0.55,
    rateSuffix: '₽ за 1 голду',
    total: 275,
    goldMode: true,
    isMarketDelivery: true,
  });

  assert.ok(url.startsWith('https://t.me/PayRadiseManager?text='));
  const decoded = decodeURIComponent(url.replace('https://t.me/PayRadiseManager?text=', ''));
  assert.match(decoded, /STANDOFF 2/);
  assert.match(decoded, /500 G/);
  assert.match(decoded, /275 ₽/);
});

test('buildSellMessage and buildSellUrl redirect immediately to @PayRadiseManager', () => {
  const msgBR = buildSellMessage('BLACK RUSSIA', false);
  assert.equal(msgBR, 'Здравствуйте! Хочу продать вирты в BLACK RUSSIA.');

  const urlBR = buildSellUrl('BLACK RUSSIA', false);
  assert.ok(urlBR.startsWith('https://t.me/PayRadiseManager?text='));

  const msgSO = buildSellMessage('STANDOFF 2', true);
  assert.equal(msgSO, 'Здравствуйте! Хочу продать голду в STANDOFF 2.');

  const urlSO = buildSellUrl('STANDOFF 2', true);
  assert.ok(urlSO.startsWith('https://t.me/PayRadiseManager?text='));
});
