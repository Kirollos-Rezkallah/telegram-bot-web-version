import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppFrame } from '../../components/AppFrame/AppFrame';
import { AdminSummaryCard } from '../../components/AdminSummaryCard/AdminSummaryCard';
import { formatCurrency } from '../../utils/formatters';
import styles from './AdminPage.module.css';

export function AdminPage() {
  const stats = useSelector((state) => state.admin.stats);

  return (
    <AppFrame compact>
      <div className={styles.page}>
        <aside className={styles.nav}>
          <Link className={styles.backLink} to="/">
            Anastasia Atelier
          </Link>
          <nav aria-label="Admin navigation">
            <a className={styles.active} href="#overview">
              Overview
            </a>
            <a href="#orders">Orders</a>
            <a href="#catalog">Catalog</a>
            <a href="#chats">Chats</a>
          </nav>
        </aside>

        <section className={styles.content}>
          <header className={styles.header}>
            <div>
              <p>Admin panel</p>
              <h1>Order operations</h1>
            </div>
            <Link className={styles.chatLink} to="/app">
              Open messenger
            </Link>
          </header>

          <div className={styles.stats}>
            <AdminSummaryCard label="New orders" value={stats.newOrders} />
            <AdminSummaryCard label="Active chats" value={stats.activeChats} accent="rose" />
            <AdminSummaryCard label="Revenue today" value={formatCurrency(stats.revenueToday)} accent="green" />
          </div>

          <section className={styles.queue} id="orders">
            <header>
              <h2>Production queue</h2>
              <span>Starter data surface</span>
            </header>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Order</span>
                <span>Customer</span>
                <span>Status</span>
                <span>Total</span>
              </div>
              <div className={styles.tableRow}>
                <span>Berry vanilla mousse cake</span>
                <span>Guest chat</span>
                <strong>Draft</strong>
                <span>{formatCurrency(6800)}</span>
              </div>
              <div className={styles.tableRow}>
                <span>Macaron gift box</span>
                <span>Corporate lead</span>
                <strong>Awaiting date</strong>
                <span>{formatCurrency(4200)}</span>
              </div>
            </div>
          </section>
        </section>
      </div>
    </AppFrame>
  );
}
