//importing modules
const createError = require("http-errors");
const TblAssessmentRepository = require("../database/src/TblAssessmentRepository");
const logger = require("../Middlewares/logger");
const IP = require("ip");
const geoip = require("geoip-lite");
const { promisify } = require("util");
const getIP = promisify(require("external-ip")());

module.exports = {
  insertAssessment: async (req, res, next) => {
    try {
      const { 
        account_id,
        hospital_name,
        province_name,
        zone_name,
        answers,
        round,
        approve_status,
        hospital_submit,
        province_submit,
        zone_submit,
        admin_submit,
        status
     } = req.body;
    
      const result = await TblAssessmentRepository.insert({ 
        account_id,
        hospital_name,
        province_name,
        zone_name,
        answers,
        round,
        approve_status,
        hospital_submit,
        province_submit,
        zone_submit,
        admin_submit,
        status
    });
      if (result) {

        res.send({
          status: 200,
          messagecode: "insert success",
        });
        // logger.authLogger.info("Info Success LoginCode by " + login_code);
      } else {
        res.send({
          status: 500,
          messagecode: "unsuccess",
        });
        // logger.authLogger.warn("Warn UnSuccess LoginCode by " + login_code);
      }
    } catch (error) {
      res.send({
        status: 500,
        messagecode: "unsuccess",
        message: error.toString(),
      });
    //   logger.authLogger.error("Error LoginCode by " + login_code);
    } finally {
      getIP()
        .then((ip) => {
          logger.ipAddressLogger.info(
            "Call Answer by function getMessageDelete Info Publice IP request Server  " +
              ip +
              " Private IP " +
              IP.address() +
              " Get location " +
              JSON.stringify(geoip.lookup(ip)) +
              "Send params by " +
              JSON.stringify(req.params),
            JSON.stringify(req.body)
          );
        })
        .catch((error) => {
          console.log("login: --> error", error);
          logger.ipAddressLogger.error(
            "Call Answer by function getMessageDelete Info Publice IP request Server  " +
              ip +
              " Private IP " +
              IP.address() +
              " Get location " +
              JSON.stringify(geoip.lookup(ip)) +
              " Send params by " +
              JSON.stringify(req.params),
            JSON.stringify(req.body) + " Message Error : " + error.toString()
          );
        });
    }
  },
  selectAssessment: async (req, res, next) => {
    try {
      const { account_id } = req.body;
    
      const result = await TblAssessmentRepository.findByAccId({ 
        account_id
    });
      if (result) {

        res.send({
          status: 200,
          messagecode: "success",
        });
        // logger.authLogger.info("Info Success LoginCode by " + login_code);
      } else {
        res.send({
          status: 500,
          messagecode: "unsuccess",
        });
        // logger.authLogger.warn("Warn UnSuccess LoginCode by " + login_code);
      }
    } catch (error) {
      res.send({
        status: 500,
        messagecode: "unsuccess",
        message: error.toString(),
      });
    //   logger.authLogger.error("Error LoginCode by " + login_code);
    } finally {
      getIP()
        .then((ip) => {
          logger.ipAddressLogger.info(
            "Call Answer by function getMessageDelete Info Publice IP request Server  " +
              ip +
              " Private IP " +
              IP.address() +
              " Get location " +
              JSON.stringify(geoip.lookup(ip)) +
              "Send params by " +
              JSON.stringify(req.params),
            JSON.stringify(req.body)
          );
        })
        .catch((error) => {
          console.log("login: --> error", error);
          logger.ipAddressLogger.error(
            "Call Answer by function getMessageDelete Info Publice IP request Server  " +
              ip +
              " Private IP " +
              IP.address() +
              " Get location " +
              JSON.stringify(geoip.lookup(ip)) +
              " Send params by " +
              JSON.stringify(req.params),
            JSON.stringify(req.body) + " Message Error : " + error.toString()
          );
        });
    }
  },
};
