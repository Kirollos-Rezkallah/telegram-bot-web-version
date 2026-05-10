import { FiCalendar, FiMessageSquare, FiPackage, FiShoppingBag } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { formatCurrency } from '../../utils/formatters';
import styles from './OrderReviewMessage.module.css';

export function OrderReviewMessage({ review }) {
  const product = useSelector((state) => state.products.entities[review?.productId]);

  if (!review || !product) {
    return null;
  }

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <FiShoppingBag aria-hidden="true" size={18} />
        <div>
          <span>Проверка заказа</span>
          <h3>{product.name}</h3>
        </div>
      </div>
      <dl className={styles.details}>
        <div>
          <FiPackage aria-hidden="true" size={16} />
          <dt>Количество</dt>
          <dd>{review.quantity}</dd>
        </div>
        <div>
          <FiCalendar aria-hidden="true" size={16} />
          <dt>Получение</dt>
          <dd>{review.pickupDate}</dd>
        </div>
        <div>
          <FiMessageSquare aria-hidden="true" size={16} />
          <dt>Комментарий</dt>
          <dd>{review.comment || 'Без комментария'}</dd>
        </div>
      </dl>
      <div className={styles.total}>
        <span>Итого</span>
        <strong>{formatCurrency(review.total)}</strong>
      </div>
    </article>
  );
}
