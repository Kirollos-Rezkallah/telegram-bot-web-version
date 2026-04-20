import { FiClock, FiInfo, FiPackage, FiShoppingBag, FiTag, FiX } from 'react-icons/fi';

import cakeCard from '../../assets/cake-card.svg';
import { Avatar } from '../Avatar/Avatar';
import { formatCurrency } from '../../utils/formatters';
import styles from './OrderSummary.module.css';

export function OrderSummary({ chat, onClose, order, product, tone = 'blue' }) {
  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <strong>Info</strong>
        <button type="button" onClick={onClose} aria-label="Close info panel">
          <FiX aria-hidden="true" size={20} />
        </button>
      </header>
      <div className={styles.profile}>
        <Avatar label={chat?.title ?? 'Cake Order Bot'} tone={tone} />
        <h2>{chat?.title ?? 'Cake Order Bot'}</h2>
        <span>{chat?.statusText ?? 'bot is online'}</span>
        <p>Automated confectionery ordering assistant for catalog browsing, draft orders, and pickup planning.</p>
      </div>
      {product && order ? (
        <>
          <img src={product.imageUrl ?? cakeCard} alt="" />
          <div className={styles.content}>
            <span className={styles.kicker}>Current draft</span>
            <h3>{product.name}</h3>
            <p className={styles.description}>{product.description}</p>
            <dl>
              <div>
                <FiTag aria-hidden="true" size={16} />
                <dt>Size</dt>
                <dd>{order.size || 'Auto'}</dd>
              </div>
              <div>
                <FiClock aria-hidden="true" size={16} />
                <dt>Pickup</dt>
                <dd>{order.pickupDate || order.deliveryDate || 'Not set'}</dd>
              </div>
              <div>
                <FiPackage aria-hidden="true" size={16} />
                <dt>Status</dt>
                <dd>{order.status}</dd>
              </div>
              <div>
                <FiInfo aria-hidden="true" size={16} />
                <dt>Total</dt>
                <dd>{formatCurrency(order.estimatedTotal)}</dd>
              </div>
            </dl>
          </div>
        </>
      ) : (
        <div className={styles.noDraft}>
          <FiShoppingBag aria-hidden="true" size={24} />
          <strong>No active draft</strong>
          <p>Use Make order or View catalog to start a new confectionery order.</p>
        </div>
      )}
    </section>
  );
}
