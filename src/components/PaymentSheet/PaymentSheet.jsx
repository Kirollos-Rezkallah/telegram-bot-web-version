import { useState } from 'react';
import { FiCreditCard, FiSmartphone, FiShoppingBag, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { finalizeInvoicePayment } from '../../features/payments/finalizeInvoicePayment';
import { PAYMENT_METHODS, paymentMethodLabels } from '../../features/payments/paymentModel';
import { validateCardPayment } from '../../features/payments/paymentValidation';
import { formatCurrency } from '../../utils/formatters';
import styles from './PaymentSheet.module.css';

const paymentOptions = [
  {
    id: PAYMENT_METHODS.CARD,
    label: paymentMethodLabels[PAYMENT_METHODS.CARD],
    icon: FiCreditCard,
  },
  {
    id: PAYMENT_METHODS.SBP,
    label: paymentMethodLabels[PAYMENT_METHODS.SBP],
    icon: FiSmartphone,
  },
  {
    id: PAYMENT_METHODS.PICKUP,
    label: paymentMethodLabels[PAYMENT_METHODS.PICKUP],
    icon: FiShoppingBag,
  },
];

const emptyCard = {
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardholder: '',
};

export function PaymentSheet({ invoice, onClose }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.entities[invoice?.productId]);
  const [method, setMethod] = useState(PAYMENT_METHODS.CARD);
  const [card, setCard] = useState(emptyCard);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const updateCard = (field, value) => {
    setCard((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (method === PAYMENT_METHODS.CARD) {
      const validationError = validateCardPayment(card);

      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setError('');
    setProcessing(true);

    window.setTimeout(() => {
      dispatch(finalizeInvoicePayment({ invoice, method }));
      setProcessing(false);
      onClose();
    }, method === PAYMENT_METHODS.PICKUP ? 450 : 900);
  };

  return (
    <div className={styles.backdrop} role="presentation">
      <form className={styles.sheet} onSubmit={handleSubmit} aria-label="Payment sheet">
        <header className={styles.header}>
          <div>
            <span>Telegram payment</span>
            <h2>{invoice?.title ?? 'Invoice'}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close payment sheet">
            <FiX aria-hidden="true" size={20} />
          </button>
        </header>

        <section className={styles.summary}>
          <strong>{product?.name ?? 'Confectionery order'}</strong>
          <span>Qty {invoice?.quantity} / Pickup {invoice?.pickupDate}</span>
          <b>{formatCurrency(invoice?.total ?? 0)}</b>
        </section>

        <div className={styles.methods} role="radiogroup" aria-label="Payment method">
          {paymentOptions.map((option) => {
            const Icon = option.icon;

            return (
              <button
                className={method === option.id ? styles.activeMethod : ''}
                key={option.id}
                type="button"
                onClick={() => {
                  setMethod(option.id);
                  setError('');
                }}
              >
                <Icon aria-hidden="true" size={17} />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        {method === PAYMENT_METHODS.CARD ? (
          <div className={styles.cardFields}>
            <label>
              <span>Card number</span>
              <input
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                value={card.cardNumber}
                onChange={(event) => updateCard('cardNumber', event.target.value)}
              />
            </label>
            <div className={styles.row}>
              <label>
                <span>Expiry</span>
                <input placeholder="MM/YY" value={card.expiry} onChange={(event) => updateCard('expiry', event.target.value)} />
              </label>
              <label>
                <span>CVV</span>
                <input inputMode="numeric" placeholder="123" value={card.cvv} onChange={(event) => updateCard('cvv', event.target.value)} />
              </label>
            </div>
            <label>
              <span>Cardholder</span>
              <input placeholder="ANASTASIA IVANOVA" value={card.cardholder} onChange={(event) => updateCard('cardholder', event.target.value)} />
            </label>
          </div>
        ) : null}

        {method === PAYMENT_METHODS.SBP ? (
          <div className={styles.note}>
            <FiSmartphone aria-hidden="true" size={20} />
            <p>Confirm this simulated SBP payment. No bank app will be opened.</p>
          </div>
        ) : null}

        {method === PAYMENT_METHODS.PICKUP ? (
          <div className={styles.note}>
            <FiShoppingBag aria-hidden="true" size={20} />
            <p>The order will be accepted now. Payment status will stay pending until pickup.</p>
          </div>
        ) : null}

        {error ? <p className={styles.error}>{error}</p> : null}

        <button className={styles.payButton} disabled={processing} type="submit">
          {processing
            ? 'Processing...'
            : method === PAYMENT_METHODS.PICKUP
              ? 'Confirm pay on pickup'
              : `Pay ${formatCurrency(invoice?.total ?? 0)}`}
        </button>
      </form>
    </div>
  );
}
