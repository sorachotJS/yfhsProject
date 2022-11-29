const moment = require("moment");
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const options = {
  level: "info",
  format: combine(
    label({ label: 'Authen Fuction!' }),
    timestamp(),
    myFormat
  ),
  transports: [    
    new transports.File({
      filename: `./logs/Authen/Authen-${moment(new Date()).format("YYYY-MM-DD")}.log`,
      level: "info",
      maxSize: 10485760,
      maxFiles: 5,
      colorize:false,
    }),    
    new transports.File({
      filename: `./logs/Authen/Authen-error-${moment(new Date()).format("YYYY-MM-DD")}.log`,
      level: "error",
      maxSize: 10485760,
      maxFiles: 5,
      colorize:false,
    }),
    new transports.File({
      filename: `./logs/Authen/Authen-warn-${moment(new Date()).format("YYYY-MM-DD")}.log`,
      level: "warn",
      maxSize: 10485760,
      maxFiles: 5,
      colorize:false,
    }),    
  ],
};

const option = {
  level: "info",
  format: combine(
    label({ label: 'Access Fuction!' }),
    timestamp(),
    myFormat
  ),
  transports: [    
    new transports.File({
      filename: `./logs/Access/Access-${moment(new Date()).format("YYYY-MM-DD")}.log`,
      level: "info",
      maxSize: 10485760,
      maxFiles: 5,
      colorize:false,
    }),    
    new transports.File({
      filename: `./logs/Access/Access-error-${moment(new Date()).format("YYYY-MM-DD")}.log`,
      level: "error",
      maxSize: 10485760,
      maxFiles: 5,
      colorize:false,
    }),
    new transports.File({
      filename: `./logs/Access/Access-warn-${moment(new Date()).format("YYYY-MM-DD")}.log`,
      level: "warn",
      maxSize: 10485760,
      maxFiles: 5,
      colorize:false,
    }),    
    new transports.File({
      filename: `./logs/Access/Access-debug-${moment(new Date()).format("YYYY-MM-DD")}.log`,
      level: "debug",
      maxSize: 10485760,
      maxFiles: 5,
      colorize:false,
    }),   
  ],
};


const ipOption = {
  level: "info",
  format: combine(
    label({ label: 'IP Address Fuction!' }),
    timestamp(),
    myFormat
  ),
  transports: [     
    new transports.File({
      filename: `./logs/IPAddress/IPAddress-${moment(new Date()).format("YYYY-MM-DD")}.log`,
      level: "debug",
      maxSize: 10485760,
      maxFiles: 5,
      colorize:false,
    }),
    new transports.File({
      filename: `./logs/IPAddress/IPAddress-${moment(new Date()).format("YYYY-MM-DD")}.log`,
      level: "error",
      maxSize: 10485760,
      maxFiles: 5,
      colorize:false,
    }),       
  ],
};

const authLogger = createLogger(options);
const accessLogger = createLogger(option);
const ipAddressLogger = createLogger(ipOption);


module.exports = { authLogger, accessLogger, ipAddressLogger };
