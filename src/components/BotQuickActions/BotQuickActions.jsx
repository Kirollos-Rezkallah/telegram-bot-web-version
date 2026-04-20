import { FiHelpCircle, FiList, FiPackage, FiShoppingBag } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { BOT_CHAT_ID } from '../../features/botSession/botStages';
import { sendCustomerMessage } from '../../features/conversation/sendCustomerMessage';
import { selectActiveChatId } from '../../features/chats/chatsSelectors';
import styles from './BotQuickActions.module.css';

const iconsByActionId = {
  confirm_order: FiPackage,
  help: FiHelpCircle,
  make_order: FiShoppingBag,
  my_orders: FiPackage,
  view_catalog: FiList,
};

export function BotQuickActions() {
  const dispatch = useDispatch();
  const activeChatId = useSelector(selectActiveChatId);
  const actions = useSelector((state) => state.botSession.availableActions ?? []);

  if (activeChatId !== BOT_CHAT_ID || actions.length === 0) {
    return null;
  }

  return (
    <div className={styles.actions} aria-label="Cake Order Bot quick actions">
      {actions.map((action) => {
        const Icon = iconsByActionId[action.id] ?? FiHelpCircle;

        return (
          <button
            key={action.id}
            className={styles.action}
            type="button"
            onClick={() => dispatch(sendCustomerMessage(action.label, { quickActionId: action.id }))}
          >
            <Icon aria-hidden="true" size={16} />
            <span>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
