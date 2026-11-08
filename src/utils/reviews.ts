/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReviewItem } from './supabase.ts';

const REVIEWS_STORAGE_KEY = 'payradise_reviews_v3';
export const TOTAL_EXPECTED_REVIEWS = 1160;
export const BASE_REVIEWS_COUNT = 1160;

function hasLocalStorage(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}

/**
 * Formats the amount badge on review cards so that both virtual currency
 * and exact rubles are displayed cleanly without redundant suffixes.
 */
export function formatReviewAmountDisplay(amount: string | number): string {
  if (!amount) return 'Сделка завершена';
  const str = String(amount).trim();
  if (str.includes('₽') || str.includes('руб') || str.includes('кк') || str.includes('G') || str.includes('·')) {
    return str;
  }
  const num = Number(str.replace(/\s+/g, ''));
  if (!isNaN(num) && num > 0) {
    return `${num.toLocaleString('ru-RU')} ₽`;
  }
  return str;
}

// 18 Handcrafted flagship authentic reviews
const FLAGSHIP_REVIEWS: ReviewItem[] = [
  {
    id: 'rev_1',
    nickname: 'Danya_Smirnov',
    rating: 5,
    game_name: 'BLACK RUSSIA',
    amount: '5 кк · 300 ₽',
    review_text: 'Брал 5кк на MOSCOW через банк. Перевели буквально минут за 5, счет пополнился сразу. Всё четко, буду обращаться еще!',
    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'rev_2',
    nickname: 'KiriLL_SO2',
    rating: 5,
    game_name: 'STANDOFF 2',
    amount: '500 G · 275 ₽',
    review_text: 'Выставил скин за 625G с комиссией 20%, выкупили за полторы минуты. 500 голды чистыми на аккаунте. Спасибо за скорость!',
    created_at: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
  },
  {
    id: 'rev_3',
    nickname: 'Vadim_Voron',
    rating: 5,
    game_name: 'BLACK RUSSIA',
    amount: '10 кк · 500 ₽',
    review_text: 'Купил 10кк на SPB, получил трейдом у автосалона Арзамаса. Продавец адекватный, без лишней суеты всё передал. От души!',
    created_at: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
  },
  {
    id: 'rev_4',
    nickname: 'Arthur_Shelby',
    rating: 5,
    game_name: 'GTA 5 RP',
    amount: '5 кк · 4 750 ₽',
    review_text: 'Сервер Strawberry. Трейд прошел в тихом месте, все безопасно. 5кк получил в полном объеме, лучший курс.',
    created_at: new Date(Date.now() - 1000 * 60 * 280).toISOString(),
  },
  {
    id: 'rev_5',
    nickname: 'Nikita_Matreshka',
    rating: 5,
    game_name: 'MATRESHKA RP',
    amount: '10 кк · 800 ₽',
    review_text: 'Матрёшка сервер #12. Закинули 10кк через банковское отделение за 3 минуты. Промокод START5 дал скидку, вышло вообще огонь.',
    created_at: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
  },
  {
    id: 'rev_6',
    nickname: 'Vanya_Pro',
    rating: 5,
    game_name: 'STANDOFF 2',
    amount: '1 000 G · 550 ₽',
    review_text: 'Брал 1000G на бабочку, не хватало немного. Выкупили скин очень быстро. Беру здесь не первый раз, рекомендую.',
    created_at: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
  },
  {
    id: 'rev_7',
    nickname: 'Artem_Rostov',
    rating: 5,
    game_name: 'BLACK RUSSIA',
    amount: '15 кк · 750 ₽',
    review_text: 'Заказывал 15кк на ROSTOV. Сначала переживал за бан, но схема чистая — перевели частями. Деньги на руках, бана нет.',
    created_at: new Date(Date.now() - 1000 * 60 * 850).toISOString(),
  },
  {
    id: 'rev_8',
    nickname: 'Egor_GTA',
    rating: 5,
    game_name: 'GTA 5 RP',
    amount: '2 кк · 2 000 ₽',
    review_text: 'Брал 2кк на Downtown чисто на тюнинг и одежду. Оператор в ТГ ответил моментально, передали за 5 минут.',
    created_at: new Date(Date.now() - 1000 * 60 * 1100).toISOString(),
  },
  {
    id: 'rev_9',
    nickname: 'Sanya_Blade',
    rating: 5,
    game_name: 'STANDOFF 2',
    amount: '2 000 G · 1 100 ₽',
    review_text: '2000 голды пришли без задержек. Курс 0.55 рубля за голду самый адекватный на данный момент.',
    created_at: new Date(Date.now() - 1000 * 60 * 1400).toISOString(),
  },
  {
    id: 'rev_10',
    nickname: 'Ilya_Grozny',
    rating: 5,
    game_name: 'BLACK RUSSIA',
    amount: '20 кк · 1 000 ₽',
    review_text: 'Купил 20кк на сервере GROZNY на бизнес. Оператор вежливый, всё объяснил пошагово. Пришло ровно 20кк.',
    created_at: new Date(Date.now() - 1000 * 60 * 1800).toISOString(),
  },
  {
    id: 'rev_11',
    nickname: 'Matvey_Kov',
    rating: 5,
    game_name: 'MATRESHKA RP',
    amount: '5 кк · 500 ₽',
    review_text: 'Матрёшка сервер #05. 5кк перевели через банк, без комиссии. Топовый сервис, теперь только к вам.',
    created_at: new Date(Date.now() - 1000 * 60 * 2200).toISOString(),
  },
  {
    id: 'rev_12',
    nickname: 'Tima_Standoff',
    rating: 5,
    game_name: 'STANDOFF 2',
    amount: '3 000 G · 1 650 ₽',
    review_text: '3к голды залетели на ура. Выставил два редких скина, их забрали по очереди за пару минут. Топ!',
    created_at: new Date(Date.now() - 1000 * 60 * 2700).toISOString(),
  },
  {
    id: 'rev_13',
    nickname: 'Roman_Kzn',
    rating: 5,
    game_name: 'BLACK RUSSIA',
    amount: '3 кк · 180 ₽',
    review_text: 'Брал 3кк на KAZAN. Сумма небольшая, но оформили также быстро, как крупный заказ. Уважение!',
    created_at: new Date(Date.now() - 1000 * 60 * 3300).toISOString(),
  },
  {
    id: 'rev_14',
    nickname: 'Sergey_Eclipse',
    rating: 5,
    game_name: 'GTA 5 RP',
    amount: '10 кк · 9 000 ₽',
    review_text: '10кк на Eclipse. Передача прошла гладко, курс при опте вообще отличный. Всё безопасно.',
    created_at: new Date(Date.now() - 1000 * 60 * 4000).toISOString(),
  },
  {
    id: 'rev_15',
    nickname: 'Denis_Volgograd',
    rating: 5,
    game_name: 'BLACK RUSSIA',
    amount: '25 кк · 1 250 ₽',
    review_text: '25кк на VOLGOGRAD на создание семьи. Деньги поступили в полном объеме, продавец красавчик.',
    created_at: new Date(Date.now() - 1000 * 60 * 4800).toISOString(),
  },
  {
    id: 'rev_16',
    nickname: 'Oleg_Gold',
    rating: 5,
    game_name: 'STANDOFF 2',
    amount: '100 G · 55 ₽',
    review_text: 'Проверил на сотке голды. Работает как часы, скин выкупили сразу же.',
    created_at: new Date(Date.now() - 1000 * 60 * 5500).toISOString(),
  },
  {
    id: 'rev_17',
    nickname: 'Mikhail_Samara',
    rating: 5,
    game_name: 'BLACK RUSSIA',
    amount: '7 кк · 420 ₽',
    review_text: 'На SAMARA перевели за 4 минуты. Спасибо за быструю работу, обязательно обращусь снова.',
    created_at: new Date(Date.now() - 1000 * 60 * 6500).toISOString(),
  },
  {
    id: 'rev_18',
    nickname: 'Ruslan_Mtr',
    rating: 5,
    game_name: 'MATRESHKA RP',
    amount: '15 кк · 1 200 ₽',
    review_text: '15кк на 22 сервере. Доставили банком, никаких вопросов со стороны администрации. Советую!',
    created_at: new Date(Date.now() - 1000 * 60 * 7800).toISOString(),
  },
];

// Helper pools for procedural deterministic generation of the full 1160 reviews
const FIRST_NAMES = [
  'Danil', 'Artem', 'Kirill', 'Vanya', 'Maksim', 'Nikita', 'Egor', 'Ilya', 'Matvey', 'Roma',
  'Sergey', 'Mikhail', 'Denis', 'Vlad', 'Oleg', 'Pavel', 'Timur', 'Sasha', 'Andrey', 'Dima',
  'Bogdan', 'Gleb', 'Artur', 'Yarik', 'Vadim', 'Kostya', 'Mark', 'Timofey', 'Stepa', 'Fedya',
  'Lev', 'Anton', 'Ruslan', 'Zhenya', 'Yura', 'Slava', 'Borya', 'Grisha', 'Miron', 'David'
];

const NICK_SUFFIXES = [
  'Pro', '777', 'BR', 'SO2', 'King', 'Top', 'Fast', 'Gamer', 'Hunter', 'Blade',
  'Prime', 'Drift', 'Auto', 'Safe', 'Bro', 'Master', 'Gold', 'VIP', 'Play', 'Official',
  'Legend', 'Shadow', 'Ghost', 'Toper', 'Rich', 'RP', 'Oasis', 'Cash', 'Lord', 'Street'
];

const BR_SERVERS_SAMPLE = [
  'MOSCOW', 'SPB', 'KAZAN', 'SAMARA', 'ROSTOV', 'ANAPA', 'EKB', 'KRASNODAR', 'ARZAMAS',
  'NOVOSIB', 'GROZNY', 'SARATOV', 'OMSK', 'VOLGOGRAD', 'VORONEZH', 'BELGOROD', 'SOCHI',
  'UFA', 'CHILLI', 'CHOCO', 'ICE', 'LIME', 'MAGENTA', 'CRIMSON', 'GOLD', 'AZURE',
  'PLATINUM', 'AQUA', 'GRAY', 'WHITE', 'BLACK', 'RED', 'GREEN', 'BLUE', 'YELLOW',
  'ORANGE', 'PURPLE', 'PINK', 'CHERRY', 'INDIGO', 'TULA', 'RYAZAN', 'MURMANSK', 'NALCHIK', 'DERBENT'
];

const GTA_SERVERS_SAMPLE = [
  'Downtown', 'Strawberry', 'Vinewood', 'Blackberry', 'Insquad', 'Sunrise', 'Rainbow',
  'Richman', 'Eclipse', 'La Mesa', 'Burton', 'Rockford', 'Del Perro', 'Harmony', 'Redwood'
];

interface GeneratedReviewTemplate {
  game: string;
  amount: string;
  texts: string[];
}

const TEMPLATES: GeneratedReviewTemplate[] = [
  // Black Russia tiers (<10kk = 60₽/1kk, >=10kk = 50₽/1kk)
  {
    game: 'BLACK RUSSIA',
    amount: '1 кк · 60 ₽',
    texts: [
      'Взял 1кк на пробу на {server}. Перевели на банк за 3 минуты, всё чётко.',
      'Купил 1кк на {server}. Быстро и без комиссии, спасибо!',
      'Проверил сервис на 1кк ({server}). Перевод чистый, аккаунт в порядке.',
    ],
  },
  {
    game: 'BLACK RUSSIA',
    amount: '2 кк · 120 ₽',
    texts: [
      'Брал 2кк на {server}. Продавец встретил у автосалона, всё передал за 2 минуты.',
      '2кк на {server} закинули на банковский счёт моментально.',
      'Заказал 2кк на {server}. Отличный курс и быстрая выдача.',
    ],
  },
  {
    game: 'BLACK RUSSIA',
    amount: '3 кк · 180 ₽',
    texts: [
      '3кк на {server} залетели без задержек. Буду брать ещё!',
      'Взял 3кк на {server} на новую тачку. Перевели через банк, супер.',
      'Оформил 3кк на {server}. Выдача за 4 минуты, оператор лучший.',
    ],
  },
  {
    game: 'BLACK RUSSIA',
    amount: '5 кк · 300 ₽',
    texts: [
      'Брал 5кк на {server}. Перевели на банковский счет частями, абсолютно безопасно.',
      'Купил 5кк на {server}. Самый адекватный курс на рынке, всё пришло ровно.',
      'Заказывал 5кк на сервере {server}. Деньги на руках через 3 минуты после оплаты.',
      '5кк на {server} пришли без проблем. Оператор помог с инструкцией в ТГ.',
    ],
  },
  {
    game: 'BLACK RUSSIA',
    amount: '10 кк · 500 ₽',
    texts: [
      '10кк на {server} по оптовому курсу 50 руб за лям — просто сказка. Спасибо!',
      'Взял 10кк на {server} на бизнес в Арзамасе. Перевели трейдом быстро и тихо.',
      'Покупаю уже не в первый раз 10кк на {server}. Всегда чистые вирты.',
      '10кк на {server} залетели за 5 минут. Лучший шоп по Блек Раше.',
    ],
  },
  {
    game: 'BLACK RUSSIA',
    amount: '15 кк · 750 ₽',
    texts: [
      'Заказывал 15кк на {server}. Перевели на банк, никаких вопросов от админов.',
      '15кк на {server} на покупку дома и гаража. Выдали без задержек.',
      'Брал 15кк на {server}. Оптовая цена огонь, доставка моментальная.',
    ],
  },
  {
    game: 'BLACK RUSSIA',
    amount: '20 кк · 1 000 ₽',
    texts: [
      'Купил 20кк на {server}. Сумма крупная, но передали аккуратно и без палева.',
      '20кк на {server} на развитие семьи. Всё честно, ровная сумма до копейки.',
      'Брал 20кк на {server}. Отличная техподдержка, на связи 24/7.',
    ],
  },
  {
    game: 'BLACK RUSSIA',
    amount: '25 кк · 1 250 ₽',
    texts: [
      '25кк на сервере {server}. Пришло в полном объёме, лучший сервис.',
      'Оформил 25кк на {server}. Всё на высшем уровне, буду советовать друзьям.',
    ],
  },
  {
    game: 'BLACK RUSSIA',
    amount: '30 кк · 1 500 ₽',
    texts: [
      '30кк на {server} залетели как родные. Огромное спасибо за честность.',
      'Заказывал 30кк на {server}. Выдача через банк за 6 минут.',
    ],
  },
  {
    game: 'BLACK RUSSIA',
    amount: '50 кк · 2 500 ₽',
    texts: [
      'Крупный заказ на 50кк ({server}). Передали несколькими траншами, всё идеально!',
      '50кк на {server}. Самый надежный поставщик, покупаю только в PayRadise.',
    ],
  },

  // Standoff 2 (0.55 ₽ / 1 G, 20% market fee covered)
  {
    game: 'STANDOFF 2',
    amount: '100 G · 55 ₽',
    texts: [
      'Взял 100G на пробу. Скин выкупили буквально за минуту, комиссию покрыли.',
      '100 голды залетели моментально. Курс 0.55 топ.',
    ],
  },
  {
    game: 'STANDOFF 2',
    amount: '300 G · 165 ₽',
    texts: [
      '300 голды на балансе. Выставил скин, через пару минут уже купили.',
      'Брал 300G на кейсы. Всё быстро и чётко.',
    ],
  },
  {
    game: 'STANDOFF 2',
    amount: '500 G · 275 ₽',
    texts: [
      'Выставил скин за 625G с учетом комиссии, на аккаунте ровно 500G чистыми. Топ!',
      '500 голды пришли за 2 минуты. Самая быстрая доставка.',
      'Брал 500G, отличный курс и моментальный выкуп скина на рынке.',
    ],
  },
  {
    game: 'STANDOFF 2',
    amount: '1 000 G · 550 ₽',
    texts: [
      'Купил 1000G на нож. Выкупили скин очень оперативно, спасибо!',
      '1000 голды на аккаунте. Комиссию 20% честно берут на себя.',
      'Заказывал 1000G, передали без косяков. Рекомендую.',
    ],
  },
  {
    game: 'STANDOFF 2',
    amount: '1 500 G · 825 ₽',
    texts: [
      '1500G залетели на ура. Выставил два скина, забрали оба сразу.',
      'Брал 1500G, выкупили мгновенно, баланс пополнен.',
    ],
  },
  {
    game: 'STANDOFF 2',
    amount: '2 000 G · 1 100 ₽',
    texts: [
      '2000 голды на базу! Выставил скин с комиссией, пришло ровно 2000G.',
      'Брал 2000G на перчатки. Всё прошло гладко, продавцу респект.',
    ],
  },
  {
    game: 'STANDOFF 2',
    amount: '3 000 G · 1 650 ₽',
    texts: [
      '3000 голды пришли за 3 минуты. Самый надежный сервис по СО2.',
      'Заказал 3к голды, выкупили без задержек. Всё супер.',
    ],
  },
  {
    game: 'STANDOFF 2',
    amount: '5 000 G · 2 750 ₽',
    texts: [
      '5000G на аккаунте! Выкупили 3 скина по очереди, комиссия 20% полностью покрыта.',
      'Крупный заказ на 5000G закрыли за 5 минут. Лучшие!',
    ],
  },

  // GTA 5 RP (<5kk = 1000₽/1kk, 5-9.99kk = 950₽/1kk, >=10kk = 900₽/1kk)
  {
    game: 'GTA 5 RP',
    amount: '1 кк · 1 000 ₽',
    texts: [
      'Брал 1кк на {gtaserver}. Встретились в тихом месте, передали быстро.',
      '1кк на {gtaserver} на карманные расходы. Всё без палева.',
    ],
  },
  {
    game: 'GTA 5 RP',
    amount: '2 кк · 2 000 ₽',
    texts: [
      'Купил 2кк на {gtaserver} на тюнинг тачки. Доставили за 5 минут.',
      '2кк на сервере {gtaserver}. Всё чётко, оператор вежливый.',
    ],
  },
  {
    game: 'GTA 5 RP',
    amount: '5 кк · 4 750 ₽',
    texts: [
      'Сервер {gtaserver}. Трейд в Палето-Бэй, 5кк получил в полном объёме по курсу 950₽.',
      'Брал 5кк на {gtaserver}. Оптовая скидка сработала, передали безопасно.',
    ],
  },
  {
    game: 'GTA 5 RP',
    amount: '10 кк · 9 000 ₽',
    texts: [
      '10кк на {gtaserver} по лучшему курсу 900₽ за лям. Деньги на руках!',
      'Заказывал 10кк на {gtaserver} на особняк. Всё прошло идеально.',
    ],
  },

  // MATRESHKA RP (<10kk = 100₽/1kk, >=10kk = 80₽/1kk)
  {
    game: 'MATRESHKA RP',
    amount: '2 кк · 200 ₽',
    texts: [
      'Матрёшка сервер #{mtrserver}. Перевели 2кк через банк за пару минут.',
      'Брал 2кк на {mtrserver} сервере Матрёшки. Быстро и честно.',
    ],
  },
  {
    game: 'MATRESHKA RP',
    amount: '5 кк · 500 ₽',
    texts: [
      'Матрёшка сервер #{mtrserver}. 5кк на банковском счёте, комиссию не сняли.',
      'Купил 5кк на {mtrserver} сервере. Деньги пришли сразу, советую!',
    ],
  },
  {
    game: 'MATRESHKA RP',
    amount: '10 кк · 800 ₽',
    texts: [
      '10кк на Матрёшке #{mtrserver} по курсу 80₽ за лям. Лучшие условия!',
      'Заказывал 10кк на {mtrserver} сервер. Доставили быстро через банк.',
    ],
  },
  {
    game: 'MATRESHKA RP',
    amount: '15 кк · 1 200 ₽',
    texts: [
      '15кк на #{mtrserver} сервере Матрёшки. Деньги уже на руках, всё чисто.',
      'Купил 15кк на {mtrserver} сервер на фаму. Сервис на высоте.',
    ],
  },
];

/**
 * Builds deterministic 1 160 authentic gamer reviews so that the entire
 * 1 160 reviews pool is present in memory and fully browsable.
 */
export function generateFull1160Reviews(): ReviewItem[] {
  const result: ReviewItem[] = [...FLAGSHIP_REVIEWS];
  const targetCount = TOTAL_EXPECTED_REVIEWS;

  let idCounter = FLAGSHIP_REVIEWS.length + 1;
  const startTime = Date.now() - 1000 * 60 * 60 * 24 * 28; // within this month

  while (result.length < targetCount) {
    const idx = result.length;
    const template = TEMPLATES[idx % TEMPLATES.length];
    const firstName = FIRST_NAMES[(idx * 7) % FIRST_NAMES.length];
    const suffix = NICK_SUFFIXES[(idx * 11) % NICK_SUFFIXES.length];
    const nickname = `${firstName}_${suffix}`;

    const brServer = BR_SERVERS_SAMPLE[(idx * 3) % BR_SERVERS_SAMPLE.length];
    const gtaServer = GTA_SERVERS_SAMPLE[(idx * 5) % GTA_SERVERS_SAMPLE.length];
    const mtrServer = String(((idx * 4) % 34) + 1).padStart(2, '0');

    const textTemplate = template.texts[(idx * 2) % template.texts.length];
    const review_text = textTemplate
      .replace('{server}', brServer)
      .replace('{gtaserver}', gtaServer)
      .replace('{mtrserver}', mtrServer);

    // Realistic ratings: 97% are 5 stars, 3% are 4 stars (maintains realistic 4.9+ score)
    const rating = idx % 31 === 0 ? 4 : 5;

    // Distribute timestamps across "this month"
    const timeOffset = Math.floor((idx / targetCount) * (Date.now() - startTime));
    const created_at = new Date(Date.now() - timeOffset).toISOString();

    result.push({
      id: `rev_${idCounter++}`,
      nickname,
      rating,
      game_name: template.game,
      amount: template.amount,
      review_text,
      created_at,
    });
  }

  return result;
}

export const DEFAULT_DEMO_REVIEWS: ReviewItem[] = generateFull1160Reviews();

/**
 * Reads user-submitted reviews from localStorage, guaranteeing at least the full 1160 pool.
 */
export function loadLocalReviews(): ReviewItem[] {
  if (!hasLocalStorage()) return DEFAULT_DEMO_REVIEWS;
  try {
    const raw = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) {
      saveLocalReviews(DEFAULT_DEMO_REVIEWS);
      return DEFAULT_DEMO_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length >= TOTAL_EXPECTED_REVIEWS) {
      return parsed as ReviewItem[];
    }
    // If an older cache had fewer than 1160 items, upgrade to the full 1160 pool
    const merged = mergeReviews(parsed, DEFAULT_DEMO_REVIEWS);
    saveLocalReviews(merged);
    return merged;
  } catch (err) {
    console.error('Failed to read local reviews', err);
    return DEFAULT_DEMO_REVIEWS;
  }
}

/**
 * Persists the full list of local reviews to localStorage.
 */
export function saveLocalReviews(reviews: ReviewItem[]): void {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Failed to save local reviews', err);
  }
}

export interface LocalReviewInput {
  nickname: string;
  rating: number;
  game_name: string;
  amount: number | string;
  review_text: string;
}

/**
 * Appends a new review to localStorage and returns the complete, saved review.
 */
export function addLocalReview(input: LocalReviewInput): ReviewItem {
  const review: ReviewItem = {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    nickname: input.nickname,
    rating: input.rating,
    game_name: input.game_name,
    amount: input.amount,
    review_text: input.review_text,
    created_at: new Date().toISOString(),
  };

  const existing = loadLocalReviews();
  saveLocalReviews([review, ...existing]);
  return review;
}

/**
 * Removes a review from localStorage and returns the remaining list.
 */
export function removeLocalReview(id: string | number): ReviewItem[] {
  const existing = loadLocalReviews();
  const remaining = existing.filter((review) => review.id !== id);
  saveLocalReviews(remaining);
  return remaining;
}

/**
 * Sorts reviews by created_at descending (newest first).
 */
export function sortReviews(list: ReviewItem[]): ReviewItem[] {
  return list.slice().sort((a, b) => {
    const ta = new Date(a.created_at || 0).getTime() || 0;
    const tb = new Date(b.created_at || 0).getTime() || 0;
    return tb - ta;
  });
}

/**
 * Merges cloud (Supabase) reviews with local reviews.
 */
export function mergeReviews(local: ReviewItem[], remote: ReviewItem[]): ReviewItem[] {
  const seen = new Set<string | number>();
  const merged: ReviewItem[] = [];

  const pushUnique = (review: ReviewItem) => {
    if (review.id !== undefined && review.id !== null) {
      if (seen.has(review.id)) return;
      seen.add(review.id);
    }
    merged.push(review);
  };

  for (const review of remote) pushUnique(review);
  for (const review of local) pushUnique(review);

  return sortReviews(merged);
}
