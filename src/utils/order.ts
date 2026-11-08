import { formatMoney } from './pricing.ts';

export const SUPPORT_URL = 'https://t.me/PayRadiseSupport';
export const MANAGER_URL = 'https://t.me/PayRadiseManager';

export interface BuyOrderPayload {
  gameName: string;
  serverName: string;
  nickname: string;
  deliveryMethod: 'trade' | 'bank' | 'market';
  bankAccount?: string;
  virtualAmount: number;
  rate: number;
  rateSuffix: string;
  total: number;
  promoCode?: string;
  promoDiscount?: number;
  isMarketDelivery?: boolean;
  goldMode?: boolean;
}

export function buildBuyOrderMessage(payload: BuyOrderPayload): string {
  const cleanNick = payload.nickname.trim();
  const serverLine = payload.goldMode
    ? ''
    : `🌐 Сервер: ${payload.serverName || 'Основной'}\n`;

  const deliveryLine = payload.isMarketDelivery
    ? '📦 Способ получения: Выкуп скина на Торговой площадке\n'
    : payload.deliveryMethod === 'bank'
    ? `📦 Способ получения: Банковский счёт (№ ${payload.bankAccount ? payload.bankAccount.trim() : '—'})\n`
    : '📦 Способ получения: Трейд (личная встреча)\n';

  const currencyUnit = payload.goldMode ? 'G' : 'кк';
  const promoLine = payload.promoDiscount && payload.promoDiscount > 0 && payload.promoCode
    ? `🏷️ Промокод: ${payload.promoCode.trim().toUpperCase()} (скидка ${formatMoney(payload.promoDiscount)})\n`
    : '';

  return (
`Здравствуйте! Оформил заказ в PayRadise:

🎮 Игра: ${payload.gameName}
${serverLine}👤 Никнейм: ${cleanNick}
${deliveryLine}💰 Количество: ${payload.virtualAmount} ${currencyUnit}
📊 Тарифный курс: ${payload.rate} ${payload.rateSuffix}
${promoLine}💳 К оплате: ${formatMoney(payload.total)}

Готов(а) оплатить!`
  );
}

export function buildBuyOrderUrl(payload: BuyOrderPayload): string {
  const message = buildBuyOrderMessage(payload);
  return `${MANAGER_URL}?text=${encodeURIComponent(message)}`;
}

export function buildSellMessage(gameName: string, goldMode = false): string {
  return `Здравствуйте! Хочу продать ${goldMode ? 'голду' : 'вирты'} в ${gameName}.`;
}

export function buildSellUrl(gameName: string, goldMode = false): string {
  const message = buildSellMessage(gameName, goldMode);
  return `${MANAGER_URL}?text=${encodeURIComponent(message)}`;
}
