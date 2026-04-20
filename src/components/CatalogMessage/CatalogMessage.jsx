import { FiShoppingBag } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import cakeCard from '../../assets/cake-card.svg';
import { sendCustomerMessage } from '../../features/conversation/sendCustomerMessage';
import { formatCurrency } from '../../utils/formatters';
import styles from './CatalogMessage.module.css';

export function CatalogMessage({ productIds = [] }) {
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    productIds
      .map((id) => state.products.entities[id])
      .filter(Boolean)
      .slice(0, 8),
  );
  const categories = useSelector((state) => state.categories.entities);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={styles.catalog}>
      {products.map((product) => (
        <article className={styles.card} key={product.id}>
          <div className={styles.media}>
            <img src={product.imageUrl ?? cakeCard} alt="" />
          </div>
          <div className={styles.body}>
            <span className={styles.category}>{categories[product.categoryId]?.name ?? 'Confectionery'}</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className={styles.footer}>
              <strong>{formatCurrency(product.basePrice)}</strong>
              <button
                type="button"
                onClick={() => dispatch(sendCustomerMessage(product.name, { quickActionId: 'select_product', productId: product.id }))}
              >
                <FiShoppingBag aria-hidden="true" size={15} />
                <span>Select</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
