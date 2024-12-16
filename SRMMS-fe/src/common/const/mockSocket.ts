interface Events {
  [key: string]: (data: any) => void;
}

const socket = {
  events: {} as Events,

  emit(eventName: string, data: any) {
    console.log(`Event Emitted: ${eventName}`, data);

    if (this.events[eventName]) {
      this.events[eventName](data);
    }

    const event = { eventName, data, timestamp: Date.now() };
    localStorage.setItem("mockSocketEvent", JSON.stringify(event));
  },

  on(eventName: string, callback: (data: any) => void) {
    this.events[eventName] = callback;
  },

  off(eventName: string) {
    delete this.events[eventName];
  },

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
