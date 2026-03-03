// Global toast state - allows calling toast() from anywhere
let toastListeners = [];
let toastId = 0;

export function toast(message, type = 'info', duration = 3000) {
   const id = ++toastId;
   const newToast = { id, message, type, duration };
   toastListeners.forEach((listener) => listener(newToast));
   return id;
}

toast.success = (msg, duration) => toast(msg, 'success', duration);
toast.error = (msg, duration) => toast(msg, 'error', duration);
toast.info = (msg, duration) => toast(msg, 'info', duration);
toast.warning = (msg, duration) => toast(msg, 'warning', duration);

export function subscribeToast(listener) {
   toastListeners.push(listener);
   return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
   };
}
