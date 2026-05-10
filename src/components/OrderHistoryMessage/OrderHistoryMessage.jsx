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
        <strong>Заказов пока нет</strong>
        <p>Здесь появятся оплаченные заказы и заказы с оплатой при получении после оформления через бота.</p>
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
                <h3>{product?.name ?? 'Индивидуальный заказ'}</h3>
              </div>
              <OrderStatusBadge status={order.status} />
            </header>
            <dl>
              <div>
                <dt>Кол-во</dt>
                <dd>{order.quantity}</dd>
              </div>
              <div>
                <dt>Получение</dt>
                <dd>{order.pickupDate}</dd>
              </div>
              <div>
                <dt>Итого</dt>
                <dd>{formatCurrency(order.estimatedTotal)}</dd>
              </div>
              <div>
                <dt>Оплата</dt>
                <dd>{getPaymentSummary(order) || 'Не указано'}</dd>
              </div>
            </dl>
          </article>
        );
      })}
    </div>
  );
}
