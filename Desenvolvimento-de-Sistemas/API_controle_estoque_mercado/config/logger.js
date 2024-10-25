const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

// Verifica e cria a pasta de logs, se necessário
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.File({ filename: path.join(logDir, 'application.log'), level: 'info' }),
    new transports.Console()
  ],
});

module.exports = logger;
