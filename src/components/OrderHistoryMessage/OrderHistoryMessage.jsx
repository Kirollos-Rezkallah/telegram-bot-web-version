import { FiInbox } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { OrderStatusBadge } from '../OrderStatusBadge/OrderStatusBadge';
import { getPaymentSummary } from '../../features/payments/paymentModel';
import { formatCurrency } from '../../utils/formatters';
import styles from './OrderHistoryMessage.module.css';

const getShortId = (id) => id.replace('order-', '').slice(0, 8).toUpperCase();

export function OrderHistoryMessage({ orderIds = [] }) {
  const orders = useSelector((state) => orderIds.map((id) => state.orders.entities[id]).filter(Boolean));
  const products = useSelector((state) => state.products.entities);

  if (orders.length === 0) {
    return (
      <article className={styles.empty}>
        <FiInbox aria-hidden="true" size={24} />
        <strong>No orders yet</strong>
        <p>Your paid or pickup-payment confectionery orders will appear here after you place one with Cake Order Bot.</p>
      </article>
    );
  }

  return (
    <div className={styles.list}>
      {orders.map((order) => {
        const product = products[order.productId];

        return (
          <article className={styles.card} key={order.id}>
            <header>
              <div>
                <span>#{getShortId(order.id)}</span>
                <h3>{product?.name ?? 'Custom order'}</h3>
              </div>
              <OrderStatusBadge status={order.status} />
            </header>
            <dl>
              <div>
                <dt>Qty</dt>
                <dd>{order.quantity}</dd>
              </div>
              <div>
                <dt>Pickup</dt>
                <dd>{order.pickupDate}</dd>
              </div>
              <div>
                <dt>Total</dt>
                <dd>{formatCurrency(order.estimatedTotal)}</dd>
              </div>
              <div>
                <dt>Payment</dt>
                <dd>{getPaymentSummary(order) || 'Not set'}</dd>
              </div>
            </dl>
          </article>
        );
      })}
    </div>
  );
}
