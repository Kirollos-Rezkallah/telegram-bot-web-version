export function throttle(callback, delay) {
  let wait = false;
  let queuedArgs = null;

  return (...args) => {
    if (wait) {
      queuedArgs = args;
      return;
    }

    callback(...args);
    wait = true;

    window.setTimeout(() => {
      wait = false;

      if (queuedArgs) {
        const nextArgs = queuedArgs;
        queuedArgs = null;
        callback(...nextArgs);
      }
    }, delay);
  };
}
