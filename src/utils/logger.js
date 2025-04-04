import dotenv from "dotenv"
dotenv.config()
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, errors } = winston.format

const logFormat = printf(({timestamp, level, message, ...metadata})=>{
  const istTime = new Intl.DateTimeFormat('en-CA', { 
      timeZone: 'Asia/Kolkata', 
      dateStyle: 'short', 
      timeStyle: 'medium',
      hourCycle: 'h23'
    }).format(new Date(timestamp)).replace(',', '');
    const safeMetadata = metadata?.toJSON ? metadata.toJSON() : metadata;
return `${istTime} [${level.toUpperCase()}]: ${message} ${Object.keys(safeMetadata).length ? `\n${JSON.stringify(safeMetadata, null, 2)}` : ''}`;
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true}), logFormat),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      localTime: true,
      maxSize: '5m',
      maxFiles: '20d',
      zippedArchive: true
    }),
  ],
});

const setLogLevel = (level) => {
  const logLevel = level?.toLowerCase()
  if(['info', 'warn', 'error'].includes(logLevel)){
      logger.level = logLevel
      console.log(`Log level set to: ${level}`);
  } else {
      console.error('Invalid log level. Use "info", "warn", or "error".');
  }
}

setLogLevel(process.env.LOG_LEVEL)

export default logger