import pastryMark from '../../assets/pastry-mark.svg';
import { AppFrame } from '../../components/AppFrame/AppFrame';
import { RoleEntryCard } from '../../components/RoleEntryCard/RoleEntryCard';
import styles from './LandingPage.module.css';

export function LandingPage() {
  return (
    <AppFrame compact>
      <div className={styles.page}>
        <header className={styles.header}>
          <img src={pastryMark} alt="" />
          <div>
            <p>Anastasia Atelier</p>
            <h1>Confectionery ordering in a Telegram-style workspace</h1>
          </div>
        </header>

        <section className={styles.roles} aria-label="Choose application area">
          <RoleEntryCard
            eyebrow="Customer"
            title="Open assistant chat"
            description="A premium messenger flow for choosing cakes, fillings, delivery dates, and finishing an order."
            to="/app"
            actionLabel="Enter chat"
          >
            <span className={styles.chatIcon} />
          </RoleEntryCard>

          <RoleEntryCard
            eyebrow="Admin"
            title="Manage incoming orders"
            description="A focused operations panel for future catalog, chat, order, and production status workflows."
            to="/admin"
            actionLabel="Open admin"
          >
            <span className={styles.adminIcon} />
          </RoleEntryCard>
        </section>
      </div>
    </AppFrame>
  );
}
