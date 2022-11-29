//importing modules
const createError = require("http-errors");
const TblAccountRepository = require("../database/src/TblAccountRepository");
const { signAccessToken } = require("../Middlewares/jwt_helper");
const logger = require("../Middlewares/logger");
const IP = require("ip");
const geoip = require("geoip-lite");
const { promisify } = require("util");
const getIP = promisify(require("external-ip")());

module.exports = {
  login: async (req, res, next) => {
    try {
      const { login_code } = req.body;
      const result = await TblAccountRepository.findByCode({ login_code });
      if (result) {
        const token = await signAccessToken({
          idToken: result.id,
        });

        delete result.id;
        delete result.status;

        res.send({
          status: 200,
          messagecode: "success",
          dataList: result,
          accessToken: token,
        });
        logger.authLogger.info("Info Success LoginCode by " + login_code);
      } else {
        res.send({
          status: 500,
          messagecode: "unsuccess",
        });
        logger.authLogger.warn("Warn UnSuccess LoginCode by " + login_code);
      }
    } catch (error) {
      res.send({
        status: 500,
        messagecode: "unsuccess",
        message: error.toString(),
      });
      logger.authLogger.error("Error LoginCode by " + login_code);
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
