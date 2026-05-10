import { useEffect, useRef, useState } from 'react';
import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react';
import { FiMic, FiPaperclip, FiSend, FiSmile } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { selectActiveChat } from '../../features/chats/chatsSelectors';
import { sendCustomerFile } from '../../features/conversation/sendCustomerFile';
import { sendCustomerMessage } from '../../features/conversation/sendCustomerMessage';
import { IconButton } from '../IconButton/IconButton';
import styles from './Composer.module.css';

export function Composer() {
  const dispatch = useDispatch();
  const activeChat = useSelector(selectActiveChat);
  const emojiPanelRef = useRef(null);
  const fileInputRef = useRef(null);
  const [messageText, setMessageText] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const canSend = Boolean(activeChat) && messageText.trim().length > 0;

  useEffect(() => {
    if (!emojiOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (emojiPanelRef.current?.contains(event.target)) {
        return;
      }

      setEmojiOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setEmojiOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [emojiOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canSend) {
      return;
    }

    const sentMessage = dispatch(sendCustomerMessage(messageText));

    if (sentMessage) {
      setMessageText('');
      setEmojiOpen(false);
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

  const handleFileChange = (event) => {
    const [file] = Array.from(event.target.files ?? []);

    if (file) {
      dispatch(sendCustomerFile(file));
      setEmojiOpen(false);
    }

    event.target.value = '';
  };

  return (
    <form className={styles.composer} onSubmit={handleSubmit}>
      <div className={styles.inputBar}>
        <IconButton label="Прикрепить файл" className={styles.inlineButton} onClick={() => fileInputRef.current?.click()}>
          <FiPaperclip aria-hidden="true" size={21} />
        </IconButton>
        <input ref={fileInputRef} className={styles.fileInput} type="file" onChange={handleFileChange} />
        <label className={styles.inputWrap}>
          <span className="visually-hidden">Сообщение</span>
          <input
            type="text"
            placeholder="Напишите сообщение..."
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
          />
        </label>
        <IconButton
          label="Эмодзи"
          className={styles.inlineButton}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            setEmojiOpen((value) => !value);
          }}
        >
          <FiSmile aria-hidden="true" size={21} />
        </IconButton>
        {emojiOpen ? (
          <div className={styles.emojiPanel} ref={emojiPanelRef}>
            <EmojiPicker
              emojiStyle={EmojiStyle.NATIVE}
              height={386}
              lazyLoadEmojis
              onEmojiClick={(emojiData) => {
                setMessageText((value) => `${value}${emojiData.emoji}`);
              }}
              previewConfig={{ showPreview: false }}
              searchPlaceHolder="Поиск эмодзи"
              theme={Theme.LIGHT}
              width="100%"
            />
          </div>
        ) : null}
      </div>
      {canSend ? (
        <IconButton label="Отправить сообщение" variant="filled" type="submit">
          <FiSend aria-hidden="true" size={19} />
        </IconButton>
      ) : (
        <IconButton
          label={isRecording ? 'Остановить запись' : 'Записать голосовое сообщение'}
          variant={isRecording ? 'recording' : 'ghost'}
          onClick={handleVoiceAction}
        >
          <FiMic aria-hidden="true" size={20} />
        </IconButton>
      )}
      {isRecording ? <span className={styles.recordingHint}>Идет запись голосового сообщения...</span> : null}
    </form>
  );
}
