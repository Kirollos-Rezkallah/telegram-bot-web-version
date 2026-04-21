import { useMemo, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createProduct, deleteProduct, upsertProduct } from '../../features/products/productsSlice';
import { ORDER_STATUSES } from '../../features/orders/orderStatus';
import { updateOrderStatus } from '../../features/orders/updateOrderStatus';
import { selectCategoriesList } from '../../features/categories/categoriesSelectors';
import { selectCustomerOrders } from '../../features/orders/ordersSelectors';
import { selectProductsList } from '../../features/products/productsSelectors';
import { formatCurrency } from '../../utils/formatters';
import cakeCard from '../../assets/cake-card.svg';
import styles from './AdminPage.module.css';

const statusOptions = [
  ORDER_STATUSES.NEW,
  ORDER_STATUSES.CONFIRMED,
  ORDER_STATUSES.IN_PROGRESS,
  ORDER_STATUSES.READY,
  ORDER_STATUSES.COMPLETED,
];

const emptyProductForm = {
  name: '',
  description: '',
  basePrice: '',
  categoryId: '',
  image: '',
  leadTimeHours: '48',
  isAvailable: true,
};

const getShortId = (id) => id.replace('order-', '').slice(0, 8).toUpperCase();

const formatDateTime = (value) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

function ProductForm({ categories, editingProduct, onCancel, onSubmit }) {
  const [form, setForm] = useState(() =>
    editingProduct
      ? {
          ...editingProduct,
          image: editingProduct.image ?? editingProduct.imageUrl ?? '',
          basePrice: String(editingProduct.basePrice),
          leadTimeHours: String(editingProduct.leadTimeHours),
        }
      : {
          ...emptyProductForm,
          categoryId: categories[0]?.id ?? '',
        },
  );

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.description.trim() || !Number(form.basePrice) || !form.categoryId) {
      return;
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      basePrice: Number(form.basePrice),
      leadTimeHours: Number(form.leadTimeHours) || 48,
      image: form.image.trim(),
      sizeOptions: form.sizeOptions ?? [],
      tags: form.tags ?? [],
    });
  };

  return (
    <form className={styles.productForm} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <label>
          <span>Name</span>
          <input required value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Dessert name" />
        </label>
        <label>
          <span>Price</span>
          <input
            required
            min="0"
            type="number"
            value={form.basePrice}
            onChange={(event) => updateField('basePrice', event.target.value)}
            placeholder="6800"
          />
        </label>
        <label>
          <span>Category</span>
          <select required value={form.categoryId} onChange={(event) => updateField('categoryId', event.target.value)}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Lead time, hours</span>
          <input
            min="1"
            type="number"
            value={form.leadTimeHours}
            onChange={(event) => updateField('leadTimeHours', event.target.value)}
          />
        </label>
      </div>
      <label>
        <span>Description</span>
        <textarea required value={form.description} onChange={(event) => updateField('description', event.target.value)} rows={3} />
      </label>
      <label>
        <span>Image URL</span>
        <input value={form.image} onChange={(event) => updateField('image', event.target.value)} placeholder="https://..." />
      </label>
      <label className={styles.checkbox}>
        <input checked={form.isAvailable} type="checkbox" onChange={(event) => updateField('isAvailable', event.target.checked)} />
        <span>Available in customer catalog</span>
      </label>
      <div className={styles.formActions}>
        <button className={styles.primaryButton} type="submit">
          {editingProduct ? 'Save product' : 'Add product'}
        </button>
        {editingProduct ? (
          <button className={styles.secondaryButton} type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export function AdminPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectCustomerOrders);
  const products = useSelector(selectProductsList);
  const categories = useSelector(selectCategoriesList);
  const [editingProductId, setEditingProductId] = useState(null);
  const editingProduct = editingProductId ? products.find((product) => product.id === editingProductId) : null;

  const stats = useMemo(() => {
    const activeOrders = orders.filter((order) => order.status !== ORDER_STATUSES.COMPLETED);
    const revenue = orders.reduce((sum, order) => sum + (order.estimatedTotal || 0), 0);

    return {
      activeOrders: activeOrders.length,
      completedOrders: orders.filter((order) => order.status === ORDER_STATUSES.COMPLETED).length,
      productsAvailable: products.filter((product) => product.isAvailable).length,
      revenue,
    };
  }, [orders, products]);

  const handleSubmitProduct = (product) => {
    if (editingProduct) {
      dispatch(upsertProduct({ ...editingProduct, ...product }));
      setEditingProductId(null);
      return;
    }

    dispatch(createProduct(product));
  };

  return (
    <main className={styles.page}>
      <aside className={styles.nav}>
        <Link className={styles.backLink} to="/">
          Anastasia Atelier
        </Link>
        <nav aria-label="Admin navigation">
          <a href="#overview">Overview</a>
          <a href="#orders">Orders</a>
          <a href="#catalog">Catalog</a>
        </nav>
        <Link className={styles.chatLink} to="/app">
          Open customer app
        </Link>
      </aside>

      <section className={styles.content}>
        <header className={styles.header} id="overview">
          <div>
            <p>Admin workspace</p>
            <h1>Confectionery operations</h1>
          </div>
        </header>

        <section className={styles.stats} aria-label="Operational summary">
          <article>
            <span>Active orders</span>
            <strong>{stats.activeOrders}</strong>
          </article>
          <article>
            <span>Completed</span>
            <strong>{stats.completedOrders}</strong>
          </article>
          <article>
            <span>Available products</span>
            <strong>{stats.productsAvailable}</strong>
          </article>
          <article>
            <span>Total revenue</span>
            <strong>{formatCurrency(stats.revenue)}</strong>
          </article>
        </section>

        <section className={styles.panel} id="orders">
          <header className={styles.panelHeader}>
            <div>
              <h2>Orders</h2>
              <span>Real customer orders created in Cake Order Bot</span>
            </div>
          </header>

          {orders.length === 0 ? (
            <p className={styles.emptyState}>No confirmed customer orders yet. Create one in Cake Order Bot to see it here.</p>
          ) : (
            <div className={styles.ordersList}>
              {orders.map((order) => {
                const product = products.find((item) => item.id === order.productId);

                return (
                  <article className={styles.orderCard} key={order.id}>
                    <div className={styles.orderMain}>
                      <span>#{getShortId(order.id)}</span>
                      <h3>{product?.name ?? 'Deleted product'}</h3>
                      <p>{order.comment || 'No customer comment'}</p>
                    </div>
                    <dl className={styles.orderMeta}>
                      <div>
                        <dt>Qty</dt>
                        <dd>{order.quantity}</dd>
                      </div>
                      <div>
                        <dt>Pickup</dt>
                        <dd>{order.pickupDate}</dd>
                      </div>
                      <div>
                        <dt>Created</dt>
                        <dd>{formatDateTime(order.createdAt)}</dd>
                      </div>
                      <div>
                        <dt>Total</dt>
                        <dd>{formatCurrency(order.estimatedTotal)}</dd>
                      </div>
                    </dl>
                    <label className={styles.statusSelect}>
                      <span>Status</span>
                      <select
                        value={order.status}
                        onChange={(event) =>
                          dispatch(
                            updateOrderStatus({
                              orderId: order.id,
                              status: event.target.value,
                            }),
                          )
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className={styles.panel} id="catalog">
          <header className={styles.panelHeader}>
            <div>
              <h2>Catalog</h2>
              <span>Changes here update the customer catalog and bot flow</span>
            </div>
          </header>

          <ProductForm
            key={editingProduct?.id ?? 'new-product'}
            categories={categories}
            editingProduct={editingProduct}
            onCancel={() => setEditingProductId(null)}
            onSubmit={handleSubmitProduct}
          />

          <div className={styles.productList}>
            {products.map((product) => {
              const category = categories.find((item) => item.id === product.categoryId);

              return (
                <article className={styles.productCard} key={product.id}>
                  <img src={product.image || cakeCard} alt="" onError={(event) => { event.currentTarget.src = cakeCard; }} />
                  <div>
                    <span>{category?.name ?? 'Uncategorized'}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <strong>{formatCurrency(product.basePrice)}</strong>
                  </div>
                  <div className={styles.productActions}>
                    <button type="button" onClick={() => setEditingProductId(product.id)} aria-label={`Edit ${product.name}`}>
                      <FiEdit2 aria-hidden="true" size={16} />
                    </button>
                    <button type="button" onClick={() => dispatch(deleteProduct(product.id))} aria-label={`Delete ${product.name}`}>
                      <FiTrash2 aria-hidden="true" size={16} />
                    </button>
                  </div>
                  <span className={product.isAvailable ? styles.available : styles.hidden}>
                    {product.isAvailable ? 'Available' : 'Hidden'}
                  </span>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
