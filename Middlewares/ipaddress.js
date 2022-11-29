const IP = require("ip");
const geoip = require("geoip-lite");
const logger = require('../middleware/logger');
const { promisify } = require("util");
const getIP = promisify(require("external-ip")());

function loggerIpAddress(loggerfile){
    console.log(loggerfile)
    getIP()
    .then((ip) => {
      logger.ipAddressLogger.info(
        "Info Publice IP request Server  " +
          ip +
          " Private IP " +
          IP.address() +
          " Get location " +
          JSON.stringify(geoip.lookup(ip)) +
          "Fuction " + loggerfile
      );
    })
    .catch((error) => {
      logger.ipAddressLogger.error(
        "Info Call IP Address by function authenticateJWT  " + error.toString()
      );
    });	
};


module.exports = { loggerIpAddress }