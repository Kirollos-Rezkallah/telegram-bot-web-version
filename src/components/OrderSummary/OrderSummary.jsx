import { FiClock, FiInfo, FiPackage, FiShoppingBag, FiTag, FiX } from 'react-icons/fi';

import cakeCard from '../../assets/cake-card.svg';
import { Avatar } from '../Avatar/Avatar';
import { formatCurrency } from '../../utils/formatters';
import styles from './OrderSummary.module.css';

export function OrderSummary({ chat, onClose, order, product, tone = 'blue' }) {
  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <strong>Информация</strong>
        <button type="button" onClick={onClose} aria-label="Закрыть боковую панель">
          <FiX aria-hidden="true" size={20} />
        </button>
      </header>
      <div className={styles.profile}>
        <Avatar className={styles.profileAvatar} label={chat?.title ?? 'Бот заказов тортов'} tone={tone} />
        <h2>{chat?.title ?? 'Бот заказов тортов'}</h2>
        <span>{chat?.statusText ?? 'бот онлайн'}</span>
        <p>Автоматический помощник для просмотра каталога, сборки черновика заказа и планирования получения.</p>
      </div>
      {product && order ? (
        <>
          <img src={product.image ?? cakeCard} alt="" onError={(event) => { event.currentTarget.src = cakeCard; }} />
          <div className={styles.content}>
            <span className={styles.kicker}>Текущий черновик</span>
            <h3>{product.name}</h3>
            <p className={styles.description}>{product.description}</p>
            <dl>
              <div>
                <FiTag aria-hidden="true" size={16} />
                <dt>Размер</dt>
                <dd>{order.size || 'Авто'}</dd>
              </div>
              <div>
                <FiClock aria-hidden="true" size={16} />
                <dt>Получение</dt>
                <dd>{order.pickupDate || order.deliveryDate || 'Не указано'}</dd>
              </div>
              <div>
                <FiPackage aria-hidden="true" size={16} />
                <dt>Статус</dt>
                <dd>{order.status === 'draft' || order.status === 'Draft' ? 'Черновик' : order.status}</dd>
              </div>
              <div>
                <FiInfo aria-hidden="true" size={16} />
                <dt>Итого</dt>
                <dd>{formatCurrency(order.estimatedTotal)}</dd>
              </div>
            </dl>
          </div>
        </>
      ) : (
        <div className={styles.noDraft}>
          <FiShoppingBag aria-hidden="true" size={24} />
          <strong>Нет активного черновика</strong>
          <p>Нажмите «Оформить заказ» или «Каталог», чтобы начать новый заказ.</p>
        </div>
      )}
    </section>
  );
}
