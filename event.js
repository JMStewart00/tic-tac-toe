class Event {
  constructor() {
    this.listeners = [];
  }

  // Custom listener function added to the listeners array.
  addListener(listener) {
    this.listeners.push(listener);
  }

  // make the event happen for all listeners.
  trigger(params) {
    this.listeners.forEach(listener => {
      listener(params);
    });
  }
}
