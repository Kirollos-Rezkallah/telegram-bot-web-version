const onlyDigits = (value) => value.replace(/\D/g, '');

export function validateCardPayment(fields) {
  const cardNumber = onlyDigits(fields.cardNumber);
  const cvv = onlyDigits(fields.cvv);
  const expiry = fields.expiry.trim();
  const cardholder = fields.cardholder.trim();

  if (cardNumber.length < 12 || cardNumber.length > 19) {
    return 'Enter a valid card number.';
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    return 'Enter expiry as MM/YY.';
  }

  if (cvv.length < 3 || cvv.length > 4) {
    return 'Enter a valid CVV.';
  }

  if (cardholder.length < 2) {
    return 'Enter the cardholder name.';
  }

  return '';
}
