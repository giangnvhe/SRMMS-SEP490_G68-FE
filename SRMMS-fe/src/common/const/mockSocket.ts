interface Events {
  [key: string]: (data: any) => void;
}

const socket = {
  events: {} as Events,

  emit(eventName: string, data: any) {
    console.log(`Event Emitted: ${eventName}`, data);

    // Notify listeners in the current tab
    if (this.events[eventName]) {
      this.events[eventName](data);
    }

    // Broadcast event to other tabs using localStorage
    const event = { eventName, data, timestamp: Date.now() };
    localStorage.setItem("mockSocketEvent", JSON.stringify(event));
  },

  on(eventName: string, callback: (data: any) => void) {
    this.events[eventName] = callback;
  },

  off(eventName: string) {
    delete this.events[eventName];
  },

  // Listen to localStorage changes
  initialize() {
    window.addEventListener("storage", (event) => {
      if (event.key === "mockSocketEvent" && event.newValue) {
        const { eventName, data } = JSON.parse(event.newValue);
        if (this.events[eventName]) {
          this.events[eventName](data);
        }
      }
    });
  },
};

socket.initialize();

export default socket;
