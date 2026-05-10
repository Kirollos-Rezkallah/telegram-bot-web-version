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
            <h1>Заказ кондитерских изделий в рабочем пространстве в стиле Telegram</h1>
          </div>
        </header>

        <section className={styles.roles} aria-label="Выбор раздела приложения">
          <RoleEntryCard
            eyebrow="Клиент"
            title="Открыть чат с помощником"
            description="Продуманный сценарий в формате мессенджера для выбора тортов, начинок, даты получения и оформления заказа."
            to="/app"
            actionLabel="Перейти в чат"
          >
            <span className={styles.chatIcon} />
          </RoleEntryCard>

          <RoleEntryCard
            eyebrow="Админ"
            title="Управлять входящими заказами"
            description="Рабочая панель для обработки заказов, управления каталогом и контроля производственных статусов."
            to="/admin"
            actionLabel="Открыть админку"
          >
            <span className={styles.adminIcon} />
          </RoleEntryCard>
        </section>
      </div>
    </AppFrame>
  );
}
