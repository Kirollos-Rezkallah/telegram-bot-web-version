export function formatChatTimestamp(dateValue) {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateValue));
}
