interface Events {
  [key: string]: ((data: any) => void)[];
}

const socket = {
  events: {} as Events,

  emit(eventName: string, data: any) {
    console.log(`Event Emitted: ${eventName}`, data);

    // Create a unique event ID to prevent duplicate processing
    const eventId = `${eventName}-${Date.now()}-${Math.random()}`;

    // Prepare the full event object
    const fullEvent = {
      id: eventId,
      eventName,
      data,
      timestamp: Date.now(),
    };

    // Broadcast event to other tabs using localStorage
    localStorage.setItem("socketEvent", JSON.stringify(fullEvent));

    // Trigger local listeners
    this.triggerLocalListeners(eventName, data);
  },

  on(eventName: string, callback: (data: any) => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  },

  off(eventName: string, callback?: (data: any) => void) {
    if (callback && this.events[eventName]) {
      // Remove specific callback
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    } else {
      // Remove all callbacks for the event
      delete this.events[eventName];
    }
  },

  triggerLocalListeners(eventName: string, data: any) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${eventName} event listener:`, error);
        }
      });
    }
  },

  initialize() {
    // Track processed event IDs to prevent duplicates
    const processedEvents = new Set<string>();

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === "socketEvent" && event.newValue) {
        try {
          const fullEvent = JSON.parse(event.newValue);

          // Prevent processing duplicate events
          if (!processedEvents.has(fullEvent.id)) {
            processedEvents.add(fullEvent.id);

            // Trigger local listeners
            this.triggerLocalListeners(fullEvent.eventName, fullEvent.data);

            // Clean up processed events to prevent memory growth
            if (processedEvents.size > 100) {
              processedEvents.clear();
            }
          }
        } catch (error) {
          console.error("Error parsing socket event:", error);
        }
      }
    };

    // Add storage event listener
    window.addEventListener("storage", handleStorageEvent);

    // Optional: cleanup method
    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  },
};

// Initialize socket event handling
socket.initialize();

export default socket;
