export const onlyDigits = (value = '') => value.replace(/\D/g, '');

export function formatCardNumber(value) {
  return onlyDigits(value)
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export function formatExpiry(value) {
  const digits = onlyDigits(value).slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function formatCvv(value) {
  return onlyDigits(value).slice(0, 3);
}

export function isCardPaymentComplete(fields) {
  return (
    onlyDigits(fields.cardNumber).length >= 16 &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(fields.expiry.trim()) &&
    onlyDigits(fields.cvv).length === 3 &&
    fields.cardholder.trim().length >= 2
  );
}

export function validateCardPayment(fields) {
  const cardNumber = onlyDigits(fields.cardNumber);
  const cvv = onlyDigits(fields.cvv);
  const expiry = fields.expiry.trim();
  const cardholder = fields.cardholder.trim();

  if (cardNumber.length < 16 || cardNumber.length > 19) {
    return 'Введите корректный номер карты.';
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    return 'Введите срок действия в формате ММ/ГГ.';
  }

  const [month, year] = expiry.split('/').map((part) => Number(part));
  const expiryDate = new Date(2000 + year, month);
  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);

  if (expiryDate <= currentMonth) {
    return 'Укажите действительный срок карты.';
  }

  if (cvv.length !== 3) {
    return 'Введите корректный CVV.';
  }

  if (cardholder.length < 2) {
    return 'Введите имя держателя карты.';
  }

  return '';
}
