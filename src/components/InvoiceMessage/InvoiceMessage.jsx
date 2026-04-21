import { useState } from 'react';
import { FiCreditCard, FiFileText } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { formatCurrency } from '../../utils/formatters';
import { PaymentSheet } from '../PaymentSheet/PaymentSheet';
import styles from './InvoiceMessage.module.css';

export function InvoiceMessage({ invoice }) {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const product = useSelector((state) => state.products.entities[invoice?.productId]);

  if (!invoice) {
    return null;
  }

  return (
    <>
      <article className={styles.invoice}>
        <header>
          <span className={styles.icon}>
            <FiFileText aria-hidden="true" size={21} />
          </span>
          <div>
            <span>Invoice</span>
            <h3>{invoice.title}</h3>
          </div>
        </header>

        <p>{invoice.description}</p>

        <dl>
          <div>
            <dt>Item</dt>
            <dd>{product?.name ?? 'Confectionery order'}</dd>
          </div>
          <div>
            <dt>Quantity</dt>
            <dd>{invoice.quantity}</dd>
          </div>
          <div>
            <dt>Pickup</dt>
            <dd>{invoice.pickupDate}</dd>
          </div>
        </dl>

        <div className={styles.total}>
          <span>Total</span>
          <strong>{formatCurrency(invoice.total)}</strong>
        </div>

        <button type="button" onClick={() => setPaymentOpen(true)}>
          <FiCreditCard aria-hidden="true" size={17} />
          <span>Pay {formatCurrency(invoice.total)}</span>
        </button>
      </article>

      {paymentOpen ? <PaymentSheet invoice={invoice} onClose={() => setPaymentOpen(false)} /> : null}
    </>
  );
}
