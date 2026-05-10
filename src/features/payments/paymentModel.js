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
  [PAYMENT_METHODS.CARD]: 'Карта',
  [PAYMENT_METHODS.SBP]: 'СБП',
  [PAYMENT_METHODS.PICKUP]: 'Оплата при получении',
};

export const paymentStatusLabels = {
  [PAYMENT_STATUSES.PAID]: 'Оплачено',
  [PAYMENT_STATUSES.PENDING]: 'Ожидает оплаты',
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
