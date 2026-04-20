import cakeCard from '../../assets/cake-card.svg';
import { formatCurrency } from '../../utils/formatters';
import styles from './OrderSummary.module.css';

export function OrderSummary({ order }) {
  return (
    <section className={styles.panel}>
      <img src={cakeCard} alt="" />
      <div className={styles.content}>
        <span className={styles.kicker}>Draft order</span>
        <h2>{order.productName}</h2>
        <dl>
          <div>
            <dt>Size</dt>
            <dd>{order.size}</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>{order.deliveryDate}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatCurrency(order.estimatedTotal)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
