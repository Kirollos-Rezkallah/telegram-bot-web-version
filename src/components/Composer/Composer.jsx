import { useState } from 'react';
import { FiMic, FiPaperclip, FiSend, FiSmile } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { selectActiveChat } from '../../features/chats/chatsSelectors';
import { sendCustomerMessage } from '../../features/conversation/sendCustomerMessage';
import { IconButton } from '../IconButton/IconButton';
import styles from './Composer.module.css';

const EMOJIS = ['\u{1F642}', '\u{1F382}', '\u{1F370}', '\u{1F9C1}', '\u2728', '\u2764\uFE0F'];

export function Composer() {
  const dispatch = useDispatch();
  const activeChat = useSelector(selectActiveChat);
  const [messageText, setMessageText] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const canSend = Boolean(activeChat) && messageText.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canSend) {
      return;
    }

    const sentMessage = dispatch(sendCustomerMessage(messageText));

    if (sentMessage) {
      setMessageText('');
    }
  };

  const handleVoiceAction = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    window.setTimeout(() => setIsRecording(false), 1600);
  };

  return (
    <form className={styles.composer} onSubmit={handleSubmit}>
      <div className={styles.inputBar}>
        <IconButton label="Attach file" className={styles.inlineButton}>
          <FiPaperclip aria-hidden="true" size={21} />
        </IconButton>
        <label className={styles.inputWrap}>
          <span className="visually-hidden">Message</span>
          <input
            type="text"
            placeholder={activeChat?.kind === 'bot' ? 'Message Cake Order Bot' : 'Message'}
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
          />
        </label>
        <IconButton label="Emoji" className={styles.inlineButton} onClick={() => setEmojiOpen((value) => !value)}>
          <FiSmile aria-hidden="true" size={21} />
        </IconButton>
        {emojiOpen ? (
          <div className={styles.emojiPanel}>
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  setMessageText((value) => `${value}${emoji}`);
                  setEmojiOpen(false);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {canSend ? (
        <IconButton label="Send message" variant="filled" type="submit">
          <FiSend aria-hidden="true" size={19} />
        </IconButton>
      ) : (
        <IconButton
          label={isRecording ? 'Stop recording' : 'Record voice message'}
          variant={isRecording ? 'recording' : 'ghost'}
          onClick={handleVoiceAction}
        >
          <FiMic aria-hidden="true" size={20} />
        </IconButton>
      )}
      {isRecording ? <span className={styles.recordingHint}>Recording voice...</span> : null}
    </form>
  );
}
