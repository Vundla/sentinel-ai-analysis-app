// eventBus.js
// Simulated event bus for microservices communication (replace with Kafka/RabbitMQ in production).

const events = {};

module.exports = {
  on: (event, handler) => {
    if (!events[event]) events[event] = [];
    events[event].push(handler);
  },
  emit: (event, data) => {
    if (events[event]) {
      events[event].forEach(handler => handler(data));
    }
  }
};
