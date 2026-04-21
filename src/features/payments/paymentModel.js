export const PAYMENT_METHODS = {
  CARD: 'card',
  SBP: 'sbp',
  PICKUP: 'pickup',
};

export const PAYMENT_STATUSES = {
  PAID: 'paid',
  PENDING: 'pending',
};

export const paymentMethodLabels = {
  [PAYMENT_METHODS.CARD]: 'Card',
  [PAYMENT_METHODS.SBP]: 'SBP',
  [PAYMENT_METHODS.PICKUP]: 'Pay on pickup',
};

export const paymentStatusLabels = {
  [PAYMENT_STATUSES.PAID]: 'Paid',
  [PAYMENT_STATUSES.PENDING]: 'Pending',
};

export function getPaymentSummary({ method, paymentMethod, paymentStatus, status }) {
  const resolvedMethod = method ?? paymentMethod;
  const resolvedStatus = paymentStatus ?? status;

  if (!resolvedMethod && !resolvedStatus) {
    return '';
  }

  return [paymentMethodLabels[resolvedMethod] ?? resolvedMethod, paymentStatusLabels[resolvedStatus] ?? resolvedStatus]
    .filter(Boolean)
    .join(' / ');
}
