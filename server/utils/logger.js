function timestamp() {
  return new Date().toISOString();
}

const logger = {
  info: (msg, ...args) => {
    console.log(`[INFO]  [${timestamp()}] ${msg}`, ...args);
  },
  warn: (msg, ...args) => {
    console.warn(`[WARN]  [${timestamp()}] ${msg}`, ...args);
  },
  error: (msg, ...args) => {
    console.error(`[ERROR] [${timestamp()}] ${msg}`, ...args);
  },
  debug: (msg, ...args) => {
    if (process.env.DEBUG === 'true') {
      console.debug(`[DEBUG] [${timestamp()}] ${msg}`, ...args);
    }
  }
};

module.exports = logger;
