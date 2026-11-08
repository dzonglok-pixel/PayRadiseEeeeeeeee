import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sortReviews,
  mergeReviews,
  DEFAULT_DEMO_REVIEWS,
  formatReviewAmountDisplay,
} from './reviews.ts';
import type { ReviewItem } from './supabase.ts';

test('sortReviews orders items newest first', () => {
  const reviews: ReviewItem[] = [
    { id: '1', nickname: 'A', rating: 5, game_name: 'BR', amount: 10, review_text: 'Good', created_at: '2026-01-01T10:00:00Z' },
    { id: '2', nickname: 'B', rating: 4, game_name: 'SO2', amount: 20, review_text: 'Nice', created_at: '2026-01-02T10:00:00Z' },
  ];
  const sorted = sortReviews(reviews);
  assert.equal(sorted[0].id, '2');
  assert.equal(sorted[1].id, '1');
});

test('mergeReviews removes duplicates by id and prioritizes remote over local', () => {
  const local: ReviewItem[] = [
    { id: 'common', nickname: 'Local', rating: 3, game_name: 'BR', amount: 5, review_text: 'Local', created_at: '2026-01-01T12:00:00Z' },
    { id: 'only_local', nickname: 'L2', rating: 5, game_name: 'GTA', amount: 10, review_text: 'L2', created_at: '2026-01-01T13:00:00Z' },
  ];
  const remote: ReviewItem[] = [
    { id: 'common', nickname: 'Remote', rating: 5, game_name: 'BR', amount: 5, review_text: 'Remote updated', created_at: '2026-01-01T12:00:00Z' },
    { id: 'only_remote', nickname: 'R2', rating: 4, game_name: 'SO2', amount: 50, review_text: 'R2', created_at: '2026-01-01T14:00:00Z' },
  ];
  const merged = mergeReviews(local, remote);
  assert.equal(merged.length, 3);
  const common = merged.find(r => r.id === 'common');
  assert.equal(common?.nickname, 'Remote');
});

test('DEFAULT_DEMO_REVIEWS contains exactly 1160 populated reviews with authentic data', () => {
  assert.equal(DEFAULT_DEMO_REVIEWS.length, 1160);
  assert.ok(DEFAULT_DEMO_REVIEWS.every(r => r.rating >= 4 && r.nickname && r.review_text && r.amount));
});

test('formatReviewAmountDisplay formats numbers and passes through combined strings', () => {
  assert.equal(formatReviewAmountDisplay('5 кк · 300 ₽'), '5 кк · 300 ₽');
  assert.equal(formatReviewAmountDisplay('500 G · 275 ₽'), '500 G · 275 ₽');
  assert.ok(formatReviewAmountDisplay('1500').includes('500') && formatReviewAmountDisplay('1500').includes('₽'));
});
